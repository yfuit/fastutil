;
org.springframework.jdbc.core.JdbcTemplate jdbcTemplate = new org.springframework.jdbc.core.JdbcTemplate();

org.springframework.jdbc.datasource.DriverManagerDataSource source = new org.springframework.jdbc.datasource.DriverManagerDataSource();
source.setDriverClassName("com.mysql.jdbc.Driver");
source.setUrl("${sqlMap.url}");
source.setUsername("${sqlMap.username}");
source.setPassword("${sqlMap.password}");
jdbcTemplate.setDataSource(source);


sqlMap.put("columns",jdbcTemplate.queryForList(
        "select * from information_schema.columns" +
                " where table_schema='${sqlMap.tableSchema}' and table_name = '${sqlMap.tableName}'"));

println("select * from information_schema.tables " +
        "where table_schema='${sqlMap.tableSchema}' and table_name='${sqlMap.tableName}'")

sqlMap.put("table",jdbcTemplate.queryForMap(
        "select * from information_schema.tables " +
                "where table_schema='${sqlMap.tableSchema}' and table_name='${sqlMap.tableName}'"));


