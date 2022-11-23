import DailySalesTotal from './components/DailySalesTotal';
import Tabs from './managerComponents/ManagerTabs';

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