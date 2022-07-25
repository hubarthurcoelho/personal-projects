import Context from "./MyContext";
import PropTypes from 'prop-types';


function MyProvider({ children }) {
  const globalState = {};
  return (
    <Context.Provider value={ globalState }>
      { children }
    </Context.Provider>
  )
}

export default MyProvider;

MyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
