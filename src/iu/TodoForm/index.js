import React from 'react';
import './TodoForm.css';
import { useNavigate } from 'react-router-dom';

function TodoForm(props) {
  const navigate = useNavigate(); // hook de navegacion de react router

  const [newTodoValue, setNewTodoValue] = React.useState(props.defaultTodoText || '');

  const onChange = (event) => {
    setNewTodoValue(event.target.value);// actualiza el estado local con el valor del textarea
  };
  const onCancel = () => {// cancela la creacion y regresa a la pagina principal
      navigate('/');
  };
  const onSubmit = (event) => {
    event.preventDefault();// evita el comportamiento predeterminado del formulario
    navigate('/');// redirige de nuevo a la pagina ppal
    props.submitEvent(newTodoValue);// llama a la funcion de creacion de TODO con el nuevo valor
      };

  return (
    <form onSubmit={onSubmit}>
      <label>{props.label}</label>
      <textarea
        value={newTodoValue}
        onChange={onChange}
        placeholder="Cortar la cebolla oara el almuerzo"
      />
      <div className="TodoForm-buttonContainer">

        <button
          type="button"
          className="TodoForm-button TodoForm-button--cancel"
          onClick={onCancel}
          >
          Cancelar
        </button>
        
        <button
          type="submit"
          className="TodoForm-button TodoForm-button--add"
        >
          {props.submitText}
        </button>
      </div>
    </form>
  );
}

export { TodoForm };
