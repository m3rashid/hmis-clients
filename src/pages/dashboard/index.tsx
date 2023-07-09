import { Button } from "antd"
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
	const navigate = useNavigate()

	return (
		<>
			<div>Dashboard</div>
			<Button onClick={() => navigate('/widgets/add')}>Create Dashboard</Button>
		</>
	)
}

export default Dashboard
