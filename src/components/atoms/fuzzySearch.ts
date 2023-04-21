export type MatchRoleType = 'input' | 'fuzzy' | 'suggestion'

export interface FuzzyMatchPart {
	content: string
	type: MatchRoleType
}

export interface FuzzyMatchData {
	parts: FuzzyMatchPart[]
	score: number
}

export interface FuzzyMatchOptions {
	truncateTooLongInput?: boolean
	isCaseSensitive?: boolean
}

function calculateFuzzyMatchPartsScore(fuzzyMatchParts: FuzzyMatchPart[]) {
	const getRoleLength = (role: MatchRoleType) =>
		fuzzyMatchParts
			.filter(part => part.type === role)
			.map(part => part.content)
			.join('').length

	const fullLength = fuzzyMatchParts.map(part => part.content).join('').length
	const fuzzyLength = getRoleLength('fuzzy')
	const inputLength = getRoleLength('input')
	const suggestionLength = getRoleLength('suggestion')

	return (inputLength + fuzzyLength * 0.7 + suggestionLength * 0.9) / fullLength
}

function compareLetters(a: string, b: string, isCaseSensitive = false) {
	if (isCaseSensitive) {
		return a === b
	}
	return a.toLowerCase() === b.toLowerCase()
}

export function fuzzyString(
	input: string,
	stringToBeFound: string,
	{ truncateTooLongInput, isCaseSensitive: isCaseSensitive }: FuzzyMatchOptions = {}
): FuzzyMatchData | false {
	// make some validation first

	// if input is longer than string to find, and we don't truncate it - it's incorrect
	if (input.length > stringToBeFound.length && !truncateTooLongInput) {
		return false
	}

	// if truncate is enabled - do it
	if (input.length > stringToBeFound.length && truncateTooLongInput) {
		input = input.substr(0, stringToBeFound.length)
	}

	// if input is the same as string to be found - we don't need to look for fuzzy match - return it as match
	if (input === stringToBeFound) {
		return {
			parts: [{ content: input, type: 'input' }],
			score: 1,
		}
	}

	const matchParts: FuzzyMatchPart[] = []

	const remainingInputLetters = input.split('')

	// let's create letters buffers
	// it's because we'll perform matching letter by letter, but if we have few letters matching or not matching in the row
	// we want to add them together as part of match
	let omittedLettersBuffer: string[] = []
	let matchedLettersBuffer: string[] = []

	// helper functions to clear the buffers and add them to match
	function addOmittedLettersAsFuzzy() {
		if (omittedLettersBuffer.length > 0) {
			matchParts.push({
				content: omittedLettersBuffer.join(''),
				type: 'fuzzy',
			})
			omittedLettersBuffer = []
		}
	}

	function addMatchedLettersAsInput() {
		if (matchedLettersBuffer.length > 0) {
			matchParts.push({
				content: matchedLettersBuffer.join(''),
				type: 'input',
			})
			matchedLettersBuffer = []
		}
	}

	for (const anotherStringToBeFoundLetter of stringToBeFound) {
		const inputLetterToMatch = remainingInputLetters[0]

		// no more input - finish fuzzy matching
		if (!inputLetterToMatch) {
			break
		}

		const isMatching = compareLetters(
			anotherStringToBeFoundLetter,
			inputLetterToMatch,
			isCaseSensitive
		)

		// if input letter does'nt match - we'll go to the next letter to try again
		if (!isMatching) {
			// add this letter to buffer of omitted letters
			omittedLettersBuffer.push(anotherStringToBeFoundLetter)
			// in case we had something in matched letters buffer - clear it as matching letters run ended
			addMatchedLettersAsInput()
			// go to the next input letter
			continue
		}

		// we have input letter matching!

		// remove it from remaining input letters
		remainingInputLetters.shift()

		// add it to matched letters buffer
		matchedLettersBuffer.push(anotherStringToBeFoundLetter)
		// in case we had something in omitted letters buffer - add it to the match now
		addOmittedLettersAsFuzzy()

		// if there is no more letters in input - add this matched letter to match too
		if (!remainingInputLetters.length) {
			addMatchedLettersAsInput()
		}
	}

	// if we still have letters left in input - means not all input was included in string to find - input was incorrect
	if (remainingInputLetters.length > 0) {
		return false
	}

	// lets get entire matched part (from start to last letter of input)
	const matchedPart = matchParts.map(match => match.content).join('')

	// get remaining part of string to be found
	const suggestionPart = stringToBeFound.replace(matchedPart, '')

	// if we have remaining part - add it as suggestion
	if (suggestionPart) {
		matchParts.push({ content: suggestionPart, type: 'suggestion' })
	}
	const score = calculateFuzzyMatchPartsScore(matchParts)

	return {
		score,
		parts: matchParts,
	}
}

export default fuzzyString
