import "./Customer.css";
import CustomerTabs from './components/CustomerTabs';

const Customer = ({ lang }) => {
  return (
    <div className="Customer">
      <CustomerTabs lang={lang} />
    </div>
  );
}

export default Customer;