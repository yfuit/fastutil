File file =  new File("${filePath}");
println("file:${filePath}");
file.getParentFile().mkdirs();

if(file.exists()){file.delete()}
file.createNewFile();

def template = new groovy.text.StreamingTemplateEngine().createTemplate(content);
def valueContent = template.make(sqlMap);

file << valueContent;
println("创建文件");