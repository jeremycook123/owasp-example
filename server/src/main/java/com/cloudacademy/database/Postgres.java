package com.cloudacademy.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Postgres {

    public static Connection connection() {
        try {
            Class.forName("org.postgresql.Driver");
            String url = System.getenv("POSTGRES_CONNSTR");
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

    // Java program to calculate MD5 hash value
    public static String md5(String input)
    {
        try {
            MessageDigest digester = MessageDigest.getInstance("MD5");
            digester.update(input.getBytes());
            byte[] md5Bytes = digester.digest();
            String md5Text = null;
        
            md5Text = bytesToHex(md5Bytes);
        
            return md5Text;
        }

        // For specifying wrong message digest algorithms
        catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

    private static final char[] hexArray = "0123456789abcdef".toCharArray();

    private static String bytesToHex(byte[] bytes) {
        char[] hexChars = new char[bytes.length * 2];
        for (int j = 0; j < bytes.length; j++) {
            int v = bytes[j] & 0xFF;
            hexChars[j * 2] = hexArray[v >>> 4];
            hexChars[j * 2 + 1] = hexArray[v & 0x0F];
        }
        return new String(hexChars);
    }    
}
