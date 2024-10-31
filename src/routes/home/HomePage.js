import React from 'react';
import { useTodos } from '../useTodos';
import { TodoHeader } from '../../iu/TodoHeader';
import { TodoCounter } from '../../iu/TodoCounter';
import { TodoSearch } from '../../iu/TodoSearch';
import { TodoList } from '../../iu/TodoList';
import { TodoItem } from '../../iu/TodoItem';
import { TodosError } from '../../iu/TodosError';
import { TodosLoading } from '../../iu/TodosLoading';
import { EmptyTodos } from '../../iu/EmptyTodos';
import { CreateTodoButton } from '../../iu/CreateTodoButton';
import { ChangeAlert } from '../../iu/ChangeAlert';
import { useNavigate } from 'react-router-dom';

function HomePage() {

  const navigate = useNavigate();
  const { state, stateUpdaters } = useTodos();

  const {
    error,
    loading,
    searchedTodos,
    totalTodos,
    completedTodos,
    searchValue,
  } = state;

  const {
    completeTodo,
    deleteTodo,
    setSearchValue,
    sincronizeTodos,
  } = stateUpdaters;
  
  return (
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

      <TodoList
        error={error}
        loading={loading}
        totalTodos={totalTodos}
        searchedTodos={searchedTodos}
        searchText={searchValue}
        onError={() => <TodosError />}
        onLoading={() => <TodosLoading />}
        onEmptyTodos={() => <EmptyTodos />}
        onEmptySearchResults={
          (searchText) => <p>No hay resultados para {searchText}</p>
        }
      >
        {todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}// represena fisicamente el chulito y si esta en verde es porque
            //se marco como tarea realizada y si esta en gris es porque aun no se ha realizado
 // osea que completed representa un estado del todo
            onEdit={() => {
              navigate(
                '/edit/' + todo.id, {
                state: { todo }
              },
              );
            }}
            onComplete={() => completeTodo(todo.id)}// esta funcion es cuando se da click en el chulo para marcar como tarea completada
            onDelete={() => deleteTodo(todo.id)}
          />
        )}
      </TodoList>

 
      <CreateTodoButton
        // setOpenModal={setOpenModal}
        onClick={()=>navigate('/new')}

      />

      <ChangeAlert
        sincronize={sincronizeTodos}
      />
    </React.Fragment>
  );
}

export {HomePage};
