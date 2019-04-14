"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "development": {
        "database": {
            "connection": {
                "host": "remotemysql.com",
                "port": 3306,
                "dialect": "mysql",
                "database": "H6x6mYKAvq",
                "username": "H6x6mYKAvq",
                "password": "dTt1HuYdC5",
                "dialectOptions": {
                    "useUTC": false,
                    "timezone": "+02:00"
                }
            },
            "forceSync": true,
            "sync": false
        },
        "application": {
            "port": 5000,
            "secret": "B9y7aQXyNNqGbJju3Nzm08rAQdqaEIjVylswPq6T"
        },
        "cloudinary": {
            "cloud_name": "rimbo",
            "api_key": "515435625778219",
            "api_secret": "O24zWFNO6pv9GEHU2YU6S8ec11U"
        }
    },
    "production": {
        "database": {
            "connection": {
                "host": "remotemysql.com",
                "port": 3306,
                "dialect": "mysql",
                "database": "H6x6mYKAvq",
                "username": "H6x6mYKAvq",
                "password": "dTt1HuYdC5",
                "dialectOptions": {
                    "useUTC": false,
                    "timezone": "+02:00"
                }
            },
            "forceSync": true,
            "sync": true
        },
        "application": {
            "port": 5000,
            "secret": "B9y7aQXyNNqGbJju3Nzm08rAQdqaEIjVylswPq6T"
        },
        "cloudinary": {
            "cloud_name": "rimbo",
            "api_key": "515435625778219",
            "api_secret": "O24zWFNO6pv9GEHU2YU6S8ec11U"
        }
    }
};