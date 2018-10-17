sqlMap.put("columns",com.CTX.bean.db.queryForList(
        "select * from information_schema.columns" +
                " where table_schema='${sqlMap.tableSchema}' and table_name = '${sqlMap.tableName}'"));

sqlMap.put("table",com.CTX.bean.db.queryForMap(
        "select * from information_schema.tables " +
                "where table_schema='${sqlMap.tableSchema}' and table_name='${sqlMap.tableName}'"));


