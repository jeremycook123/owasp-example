package com.cloudacademy.database;

import java.sql.Connection;
import java.sql.DriverManager;

public class Postgres {

    public static Connection connection() {
        try {
            Class.forName("org.postgresql.Driver");
            var url = System.getenv("POSTGRES_CONNSTR");
            System.out.println("postgres connection string: " + url);
            return DriverManager.getConnection(url,
                                                System.getenv("POSTGRES_USER"), 
                                                System.getenv("POSTGRES_PASSWORD"));
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(1);
        }
        return null;
    }
}
