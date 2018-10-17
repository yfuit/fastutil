println("start make groovy project...")
public File saveFile(String fileStr){
    File file = new File(fileStr);
    if(file.exists()){
        file.delete();file.createNewFile();
    } else {
        file.getParentFile().mkdirs();file.createNewFile();
    }
    return file;
}

saveFile("./server/src/main/groovy/com/CTX.groovy") << '''\
package com

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.stereotype.Controller
import org.springframework.util.StringUtils
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@Controller  @Configuration @SpringBootApplication
class CTX {

    static void main(String[] args) { SpringApplication.run CTX, args }
    @ResponseBody @RequestMapping("grun")
    public Object grun( String guri,String gstr,String params) throws IOException, ResourceException, ScriptException {
        String[] roots = [ "/groovy/" ];
        Binding binding = new Binding();
        if(!StringUtils.isEmpty(guri)){ GroovyScriptEngine gse = new GroovyScriptEngine(roots); gse.run(guri,binding) }
        if(!StringUtils.isEmpty(gstr)){ GroovyShell shell = new GroovyShell(binding);  shell.evaluate(gstr);  }
        if(null != CTX.result){return CTX.result; }else{return null;}
    }

    private CorsConfiguration buildConfig() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOrigin("*"); // 1允许任何域名使用
        corsConfiguration.addAllowedHeader("*"); // 2允许任何头
        corsConfiguration.addAllowedMethod("*"); // 3允许任何方法（post、get等）
        return corsConfiguration;
    }

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", buildConfig()); // 4
        return new CorsFilter(source);
    }
    public static Object param;public static Object result;public static def bean=[:];
}
''';

saveFile("./server/src/main/resources/application.properties")<< '''\
server.port=8083

spring.datasource.url=jdbc:mysql://127.0.0.1:3306/test
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.max-idle=10
spring.datasource.max-wait=10000
spring.datasource.min-idle=5
spring.datasource.initial-size=5
''';

saveFile("./server/src/test/groovy/com/CTXTests.groovy")<<'''\
package com

import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner

@RunWith(SpringRunner)
@SpringBootTest
class CTXTests {

    @Test
    void contextLoads() {
    }

}
''';

saveFile("./server/build.gradle")<<'''\
buildscript {
    ext {
        springBootVersion = '2.0.5.RELEASE'
    }
    repositories {
        mavenLocal()
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'groovy'
apply plugin: 'eclipse-wtp'
apply plugin: 'org.springframework.boot'
apply plugin: 'io.spring.dependency-management'
apply plugin: 'war'

group = 'com'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = 1.8

repositories {
    mavenLocal()
    mavenCentral()
}

dependencies {
    implementation('org.springframework.boot:spring-boot-starter-jdbc')
    implementation('org.springframework.boot:spring-boot-starter-web')
    implementation('org.mybatis.spring.boot:mybatis-spring-boot-starter:1.3.2')
    implementation('org.codehaus.groovy:groovy')
    //runtimeOnly('org.springframework.boot:spring-boot-devtools')
    runtimeOnly('mysql:mysql-connector-java')
    testImplementation('org.springframework.boot:spring-boot-starter-test')
}
''';

saveFile("./server/settings.gradle")<<"rootProject.name = 'server'";

saveFile("./server/run.bat")<<"gradle bootrun";

saveFile("./generate.bat")<<"groovy server.groovy";

println("end make groovy project.")







