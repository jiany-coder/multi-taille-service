import re
TAIL=" Appel direct : 07 67 23 41 23."
for f in ["src/data/localPages.js","src/data/services.js","src/data/articles.js"]:
    out=[]
    for line in open(f,encoding="utf-8"):
        m=re.match(r'^(\s*meta: ")(.*)(",?\s*)$',line.rstrip("\n"))
        if m and len(m.group(2))>165:
            s=m.group(2)
            has_phone="07 67 23 41 23" in s
            body=re.sub(r'\s*(Devis gratuit|Appelez le|Appel direct)[^.]*07 67 23 41 23\.?$','',s).strip() if has_phone else s
            tail=TAIL if has_phone else ""
            lim=165-len(tail)
            if len(body)>lim:
                cut=body[:lim]
                k=max(cut.rfind(", "),cut.rfind(" : "),cut.rfind(". "))
                body=(cut[:k] if k>70 else cut[:cut.rfind(" ")]).rstrip(" ,:;.")+"."
            elif not body.endswith("."): body+="."
            line=m.group(1)+body+tail+m.group(3)+"\n"
        out.append(line)
    open(f,"w",encoding="utf-8").write("".join(out))
