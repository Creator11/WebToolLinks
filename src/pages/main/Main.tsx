import s from './Main.module.scss';
import DashboardCard from "../../modules/DashboardCard/DashboardCard.tsx";

const Main = () => {

    return (
        <div className={s.main}>
         <DashboardCard/>
        </div>
    );
};

export default Main;