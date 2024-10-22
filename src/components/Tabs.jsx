import PropTypes from "prop-types";

const Tab = ({ activeTab, setActiveTab, tabName }) => {
  return (
    <div
      className={`tab ${activeTab === tabName ? "active" : ""}`}
      onClick={() => setActiveTab(tabName)}
    >
      {tabName}
    </div>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
};

export default Tab;
