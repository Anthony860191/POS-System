import DailySalesTotal from './components/DailySalesTotal';
import Tabs from './managerComponents/Tabs';

const Manager = () => {
  return (
    <div className="Manager">
        <center>
            <Tabs />
        </center>
        <center>
          <DailySalesTotal></DailySalesTotal>
        </center>
    </div>
  );
}
    
export default Manager;