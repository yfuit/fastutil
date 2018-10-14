;
def filePath="${sqlMap.srcDir}\\${sqlMap.packagePath}\\Controller\\${sqlMap.tableName.toPO()}Controller.java";
def content = '''\
package ${packageName}.Controller

import com.yfuit.generate.tpl.tplController
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

@Controller
public class ${table.TABLE_NAME.toPO()}Controller {

@Autowired
        ${table.TABLE_NAME.toPO()}Service ${table.TABLE_NAME.toEO()}Service;

@ResponseBody
@RequestMapping("/generate.html")
        String generate(String packageName,String tableName,String method){

                println("tableName:\\${tableName},method:\\${method}")

                def template = new groovy.text.StreamingTemplateEngine().createTemplate(tplController.content)
                Map<String,Object> map = tableInfoService.getTableInfo(tableName);
        map.put("packageName",packageName)
        String value = template.make(map);
        println("value:\\${value}");
        return value;
        }
        }
        ''';

