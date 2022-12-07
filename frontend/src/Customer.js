import "./Customer.css";
import CustomerTabs from './components/CustomerTabs';

/**
 * @author Oliver Carver
 * @author Anthony Mercado
 * Customer page containing customer tabs
 * @param {string} lang - The language the web page needs to be using 
 * @param {string} mode - The theme mode for CSS styling
 * @returns Customer page
 */

const Customer = ({ lang, mode }) => {
  return (
    <div className="Customer">
      <CustomerTabs lang={lang} mode={mode} />
    </div>
  );
}

export default Customer;