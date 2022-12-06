import OrderMenuForm from './serverComponents/OrderMenu';

const Server = ({ lang }) => {
  return (
    <div className="Server">
      <OrderMenuForm lang={lang} />
    </div>
  );
}

export default Server;