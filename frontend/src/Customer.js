import "./Customer.css";
import CustomerTabs from './components/CustomerTabs';

const Customer = ({ lang, mode }) => {
  return (
    <div className="Customer">
      <CustomerTabs lang={lang} mode = {mode} />
    </div>
  );
}

export default Customer;