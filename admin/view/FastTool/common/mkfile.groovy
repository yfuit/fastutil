File filed =  new File("${sqlMap.srcDir}${File.separator}${sqlMap.packagePath}");
filed.mkdirs();
File file =  new File("${filePath}");
file.createNewFile();
file << content;
println("创建文件");