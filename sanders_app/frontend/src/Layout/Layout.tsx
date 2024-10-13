import { ReactNode } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import { MyMenu } from "../components/Menu/Menu";

import styles from "./Layout.module.css";

export const Layout = ({ children }: { children: ReactNode }) => (
    <div className={styles.body}>
        <header className={styles.header}>
            <AppBar />
            <MyMenu />
        </header>
        <main className={styles.main}>{children}</main>
    </div>
);