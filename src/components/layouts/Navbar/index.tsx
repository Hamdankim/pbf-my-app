import Image from "next/image";
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Navbar = () => {
  // Menggunakan destructuring yang lebih deskriptif (data alias session)
  const { data }: any = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__brand}>MyApp</div>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              <span>
                Welcome, {data.user?.fullname}
                {data.user?.role ? ` (${data.user.role})` : ""}
              </span>
              {data.user?.image && (
                <Image
                  width={50}
                  height={50}
                  src={data.user.image}
                  alt={data.user.fullname}
                  className={styles.navbar__user__image}
                />
              )}
            </div>
            <button
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
