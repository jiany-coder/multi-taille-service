import re,sys,glob
for f in ["src/data/localPages.js","src/data/services.js","src/data/articles.js","src/data/site.js"]:
    out=[]
    for line in open(f,encoding="utf-8"):
        if re.match(r'\s*overline:',line): line=line.replace(" — ",": ")
        line=line.replace(" — ",", ").replace(" – ",", ")
        m=re.match(r'^(\s*title: ")(.*)(",?\s*)$',line.rstrip("\n"))
        if m:
            main=m.group(2).split(" | ")[0]
            t=main
            for suf in (" | Multi Taille Services"," | Multi Taille"):
                if len(main+suf)<=60: t=main+suf;break
            line=m.group(1)+t+m.group(3)+"\n"
        out.append(line)
    open(f,"w",encoding="utf-8").write("".join(out))
