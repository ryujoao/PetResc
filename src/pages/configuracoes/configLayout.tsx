import { Link, Outlet } from "react-router-dom"; 
import styles from "../perfil/perfil.module.css";

import { useAuth } from "../../auth/AuthContext"; 
import Layout from "../../components/layout";
import { BsFillPersonFill } from "react-icons/bs";
import { TbSettingsFilled } from "react-icons/tb";

export default function ConfigLayout() {
  
  const { user } = useAuth(); 

  
  const displayName = user?.role === "ONG" && user?.nomeOng ? user.nomeOng : user?.nome;

  return (
    <>
      <Layout>
        <div className={styles.perfilContainer}>
          
          <div className={styles.banner}>
            <Link to="/config" className={styles.configIcon}>
              <TbSettingsFilled />
            </Link>
          </div>

          <div className={styles.avatar}>
            <div className={styles.avatarLabel}>
               
               <BsFillPersonFill className={styles.avatarIcon} />
            </div>
          </div>

          
          <p className={styles.username}>
            {displayName || "Username"}
          </p>

          <div className={styles.contentArea}>
            
            <Outlet />
          </div>
        </div>
      </Layout>
    </>
  );
}