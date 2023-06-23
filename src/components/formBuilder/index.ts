import {
	Button,
	Checkbox,
	DatePicker,
	Input,
	InputNumber,
	Radio,
	Switch,
	Select,
	Form,
	Image,
	Row,
	Col,
} from 'antd';
import FormBuilder from './builder';

FormBuilder.register('button', Button);
FormBuilder.register('input', Input);
FormBuilder.register('password', Input.Password);
FormBuilder.register('textarea', Input.TextArea);
FormBuilder.register('number', InputNumber);
FormBuilder.register('checkbox', Checkbox);
FormBuilder.register('switch', Switch);
FormBuilder.register('radio-group', Radio.Group);
FormBuilder.register('select', Select);
FormBuilder.register('checkbox-group', Checkbox.Group);
FormBuilder.register('date-picker', DatePicker as any);
FormBuilder.register('radio', Radio);
FormBuilder.register('form', Form);
FormBuilder.register('form-item', Form.Item);
FormBuilder.register('image', Image);
FormBuilder.register('row', Row);
FormBuilder.register('col', Col);
FormBuilder.register('button', Button);

export default FormBuilder;
