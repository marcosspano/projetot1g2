import { useSession } from '../../../../../../hooks/useSession';
import { Link } from 'react-router-dom';
import iconAdmin from "../../../../../../Assets/img/administrador.png";

import styled from './styles.module.scss';

export function UserProfile({bgColor, textColor}) {
  const { session } = useSession();

  return (
    <div className={styled.container}>
      <div className={styled.profile}>
      {session.user.credentialAcess === "ADMIN" &&(
          <>
            <Link to="/administrador">
              <img id="adminIcon" src={iconAdmin} alt="Icon Adiministrador"/>
            </Link>
          </>
        )
}
        <div className={`${bgColor}`}>{session.user.nameAcronym}</div>
        <span className={`${textColor}`}>Olá, <br/>{session.user.fullName}</span>
      </div>
    </div>
  )
}
