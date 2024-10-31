import React from 'react';

function TodoHeader({ children, loading }) {
  return (
    <header>
      {
        React.Children
          .toArray(children)
          .map(child => React.cloneElement(child, { loading }))
      }
    </header>
  );
}

export { TodoHeader };
// eneste componente se usa toArray para envolver en un array los dos componentes hijos:
//
// [
//   <TodoCounter totalTodos={10} completedTodos={5} />,
//   <TodoSearch searchValue="react" setSearchValue={() => {}} />
// ]

// esto permite por medio de .map recorrer cada uno de los componentes y por medio de React.cloneElement
// se encarga de clonar cada uno de ellos y añadirles el prop loading:
//<TodoCounter totalTodos={10} completedTodos={5} loading={true} />
//<TodoSearch searchValue="react" setSearchValue={() => {}} loading={true} />

//El resultado de esta operación es que ambos componentes hijos ahora tienen acceso al prop loading sin 
//necesidad de que lo hayas pasado explícitamente a cada uno de ellos en su definición 
//original. 