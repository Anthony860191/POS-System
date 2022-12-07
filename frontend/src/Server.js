import OrderMenuForm from './serverComponents/OrderMenu';

const Server = ({ lang, mode }) => {
  return (
    <div className="Server">
      <OrderMenuForm lang={lang} mode = {mode} />
    </div>
  );
}

export default Server;