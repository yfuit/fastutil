;
Object.metaClass.toPO={
    def target = delegate+"";
    target =("_"+target).toLowerCase();

    def tmp = "";
    def toUFlag= false;
    target.toList().each {
        if("_".equals(it)){
        toUFlag=true;
        }else{
        if(toUFlag){
        tmp=tmp.concat(it.toUpperCase());
        }else{
        tmp=tmp.concat(it);
        }
        toUFlag=false;
        }
    }
    return tmp;
}
Object.metaClass.toEO={
    def target = delegate.toPO()+"";
    target= target[0].toLowerCase()+target[1..target.size()-1]
    return target;
};