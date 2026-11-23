"""Enrichissement des pages locales : faits réels par commune, angle selon le type de terrain,
cas concrets et conseils tirés de réserves distinctes. Rien d'inventé : lieux et repères publics seulement."""
import hashlib

DEPS = {"14": "Calvados", "27": "Eure", "61": "Orne"}

# (type de terrain, repères publics de la commune)
FACTS = {
    "Lisieux": ("centre", "Lisieux s'étend dans la vallée de la Touques, avec la basilique Sainte-Thérèse sur la hauteur et la cathédrale Saint-Pierre dans le centre. Entre le centre dense et les quartiers pavillonnaires, les jardins vont de la cour ombragée au grand terrain en pente."),
    "Honfleur": ("centre", "Honfleur ouvre sur l'estuaire de la Seine, autour du Vieux Bassin et de ses maisons à pans de bois. Les rues du centre sont étroites, alors que les propriétés du plateau, vers la Côte de Grâce, ont de bien plus grands jardins."),
    "Deauville": ("littoral", "Deauville est connue pour ses Planches, son hippodrome et son casino. Derrière le front de mer, de nombreuses villas des XIXe et XXe siècles ont des jardins arborés et des clôtures végétales à entretenir."),
    "Trouville-sur-Mer": ("littoral", "Trouville-sur-Mer s'étire entre l'embouchure de la Touques et le front de mer, avec son marché aux poissons sur le quai. Les maisons de ville serrées en bas laissent place, sur les coteaux, à des villas et à des jardins en pente."),
    "Houlgate": ("littoral", "Houlgate est une station balnéaire réputée pour ses villas et, à proximité, les falaises des Vaches Noires. Les jardins de villas y sont souvent abrités par de grandes haies."),
    "Villers-sur-Mer": ("littoral", "Villers-sur-Mer est connue pour sa plage et pour les falaises des Vaches Noires, un site apprécié des amateurs de fossiles. Les jardins y reçoivent vent et embruns."),
    "Blonville-sur-Mer": ("littoral", "Blonville-sur-Mer est une station balnéaire de la Côte Fleurie, entre Deauville et Villers-sur-Mer, avec sa grande plage de sable."),
    "Touques": ("vallee", "Touques s'étend au bord de la rivière du même nom, à l'arrière de Trouville et de Deauville, et accueille l'hippodrome de Deauville-La Touques."),
    "Cabourg": ("littoral", "Cabourg est connue pour son Grand Hôtel, sa digue-promenade et le souvenir de Marcel Proust. Ses rues rayonnent en éventail depuis le casino et le Grand Hôtel, entre villas et jardins de ville."),
    "Dives-sur-Mer": ("centre", "Dives-sur-Mer garde ses halles médiévales et le souvenir de Guillaume le Conquérant, dont la flotte aurait appareillé de l'estuaire de la Dives en 1066."),
    "Merville-Franceville-Plage": ("littoral", "Merville-Franceville-Plage est une station balnéaire proche de l'embouchure de la Dives, connue pour la batterie de Merville, site de mémoire du Débarquement."),
    "Pont-l'Évêque": ("centre", "Pont-l'Évêque donne son nom à un fromage AOP et est traversée par la Touques, avec un centre ancien à pans de bois."),
    "Livarot-Pays-d'Auge": ("herbages", "Livarot-Pays-d'Auge, commune du fromage de Livarot, s'étend dans la vallée de la Vie, entre herbages et haies."),
    "Vimoutiers": ("herbages", "Vimoutiers est associée au camembert et à Marie Harel. La ville a été en grande partie reconstruite après 1944 et s'ouvre sur les herbages de la vallée de la Vie."),
    "Orbec": ("centre", "Orbec s'étend le long de l'Orbiquet, avec un centre ancien à pans de bois, dont le Vieux Manoir, et des coteaux boisés autour."),
    "Cambremer": ("herbages", "Cambremer est un repère de la route du cidre, au cœur des vergers du Pays d'Auge, entre manoirs, pommiers hautes tiges et herbages."),
    "Saint-Pierre-en-Auge": ("centre", "Saint-Pierre-en-Auge regroupe notamment l'ancienne Saint-Pierre-sur-Dives, connue pour ses halles et son abbatiale."),
    "Mézidon Vallée d'Auge": ("plaine", "Mézidon Vallée d'Auge s'est construite autour de Mézidon-Canon, nœud ferroviaire à l'entrée de la vallée de la Dives."),
    "Falaise": ("centre", "Falaise, ville natale de Guillaume le Conquérant, est dominée par son château. Son centre ancien côtoie des quartiers résidentiels aux jardins plus ouverts."),
    "Dozulé": ("herbages", "Dozulé est un bourg du Pays d'Auge tourné vers la vallée de la Dives, à quelques kilomètres de la côte."),
    "Argences": ("plaine", "Argences est un bourg de la plaine, à l'est de Caen, traversé par la Muance."),
    "Troarn": ("plaine", "Troarn est un bourg ancien marqué par son abbaye, à la lisière des marais de la Dives."),
    "Bernay": ("vallee", "Bernay s'étend sur la Charentonne, dans l'Eure, et conserve son abbatiale Notre-Dame."),
    "Pont-Audemer": ("vallee", "Pont-Audemer, sur la Risle, est surnommée la petite Venise normande pour ses canaux et ses maisons à colombages."),
    "Brionne": ("vallee", "Brionne, sur la Risle, est dominée par les vestiges de son donjon."),
    "Serquigny": ("vallee", "Serquigny est un carrefour ferroviaire installé dans la vallée de la Risle."),
    "Thiberville": ("herbages", "Thiberville est un bourg de l'Eure, aux confins du Lieuvin et du Pays d'Auge."),
    "Cormeilles": ("herbages", "Cormeilles est un bourg de l'Eure, dans le Lieuvin, non loin de la limite du Calvados."),
    "Beuzeville": ("plaine", "Beuzeville, dans l'Eure, se trouve entre l'estuaire de la Seine et la vallée de la Risle."),
}
DEFAULT_KIND = {"coast": "littoral", "honfleur": "centre", "plain": "plaine", "eure": "vallee", "auge": "herbages"}

SERVICE_LABEL = {"elagage": "l'élagage", "jardinier": "l'entretien de jardin", "taille-de-haie": "la taille de haie",
                 "tonte-de-pelouse": "la tonte", "debroussaillage": "le débroussaillage", "entretien-de-jardin": "l'entretien du jardin"}

H2 = {
    "elagage": ["{c} : ce que le terrain change pour l'élagage", "Élaguer à {c} selon le quartier", "{c} et ses arbres : repères du terrain"],
    "jardinier": ["{c} : ce que le terrain change pour le jardin", "Jardiner à {c} selon le quartier", "{c} et ses jardins : repères du terrain"],
    "taille-de-haie": ["{c} : ce que le terrain change pour les haies", "Tailler une haie à {c} selon le quartier", "{c} et ses haies : repères du terrain"],
    "tonte-de-pelouse": ["{c} : ce que le terrain change pour la pelouse", "Tondre à {c} selon le quartier", "{c} et ses pelouses : repères du terrain"],
    "debroussaillage": ["{c} : ce que le terrain change pour le débroussaillage", "Débroussailler à {c} selon le terrain", "{c} et ses terrains : repères"],
    "entretien-de-jardin": ["{c} : ce que le terrain change pour l'entretien", "Entretenir un jardin à {c} selon le quartier", "{c} et ses jardins : repères du terrain"],
}

ANGLE = {
    "centre": {
        "elagage": "En centre ancien, les cours et jardins sont petits, l'accès est souvent étroit et les arbres touchent façades et toitures voisines : nous travaillons plutôt en grimpe, branche par branche, avec des protections et des cordes de rappel.",
        "jardinier": "En centre ancien, les jardins sont petits et enclavés : pas de remorque devant la porte, parfois un passage par la maison. Nous organisons les passages en conséquence et évacuons les déchets nous-mêmes.",
        "taille-de-haie": "Dans les rues serrées, les haies bordent des trottoirs et des murs : la taille se fait proprement, avec bâches au sol et ramassage immédiat pour ne rien laisser sur la voie.",
        "tonte-de-pelouse": "Les petites pelouses de centre-ville se tondent vite mais demandent des finitions soignées le long des murs et des massifs, avec du matériel compact.",
        "debroussaillage": "En ville, le débroussaillage concerne surtout des fonds de parcelle, des talus et des terrains vides : nous travaillons avec un matériel adapté aux accès étroits.",
        "entretien-de-jardin": "Petits jardins, murs et pots : l'entretien passe par des passages courts et réguliers, sans gros engins, avec un seul interlocuteur.",
    },
    "littoral": {
        "elagage": "Près de la mer, vent et embruns marquent les arbres : couronnes déportées, branches cassées, feuillage brûlé côté large. Nous allégeons les arbres exposés pour qu'ils résistent mieux aux tempêtes.",
        "jardinier": "Sur la côte, le vent, le sel et le sol léger changent le jardin : plantations plus rustiques, arrosage plus attentif, nettoyage après les tempêtes. Beaucoup de maisons sont aussi des résidences secondaires : nous entretenons en votre absence.",
        "taille-de-haie": "Les haies du littoral font brise-vent : thuyas, lauriers, tamaris, cyprès. Le vent salé brûle les pousses trop sévèrement taillées, d'où une taille mesurée et à la bonne saison.",
        "tonte-de-pelouse": "Près de la mer, la pelouse sèche vite en été sur sol léger : nous relevons la hauteur de coupe et espaçons les tontes en période chaude.",
        "debroussaillage": "Sur la côte, les terrains peu entretenus se couvrent vite de ronces et d'arbustes tourmentés par le vent : nous les reprenons sans abîmer les plantations utiles.",
        "entretien-de-jardin": "Jardins de villas et résidences secondaires : nous prévoyons des passages avant l'été, en septembre et après les coups de vent, pour que tout soit net à chaque arrivée.",
    },
    "herbages": {
        "elagage": "En pays de bocage et d'herbages, les arbres sont nombreux : chênes de haies, pommiers hautes tiges, frênes, peupliers. Nous élaguons au bon moment pour chaque essence, et sécurisons ceux qui surplombent chemins, clôtures et bâtiments.",
        "jardinier": "Les propriétés du bocage ont souvent de grands terrains, des vergers et des talus : nous planifions les passages par saison pour que tout reste maîtrisé sans y passer vos week-ends.",
        "taille-de-haie": "Les haies champêtres de la campagne augeronne mêlent charmes, noisetiers, aubépines et érables. Une taille d'hiver régulière les garde denses et protège la faune qui y niche.",
        "tonte-de-pelouse": "Sur les grands terrains de campagne, la pelouse côtoie prés et vergers : nous tondons les surfaces d'agrément et les bordures de chemins avec du matériel adapté aux grandes surfaces.",
        "debroussaillage": "Autour des fermes et des vergers, les parcelles se referment vite : ronces, orties, jeunes arbres. Nous les reprenons en gardant les arbres utiles et les haies.",
        "entretien-de-jardin": "Entre vergers, haies et grandes pelouses, nous proposons un forfait saisonnier qui couvre tonte, taille et ramassage, en gardant le charme de la propriété.",
    },
    "vallee": {
        "elagage": "En fond de vallée, l'humidité favorise les peupliers, saules et aulnes, qui poussent vite et casent facilement. Nous les contrôlons régulièrement, surtout au bord des rivières et près des habitations.",
        "jardinier": "En vallée humide, le sol reste frais : la pelouse se couvre de mousse, les massifs demandent un bon drainage. Nous adaptons tontes, désherbage et soins au terrain.",
        "taille-de-haie": "Les haies de vallée aiment l'humidité mais souffrent de la mousse et des maladies : une taille aérée et un nettoyage du pied de haie les gardent en bonne santé.",
        "tonte-de-pelouse": "Sur sol humide, la tonte demande de la patience : nous évitons les terrains détrempés pour ne pas creuser d'ornières et ramassons l'herbe pour limiter la mousse.",
        "debroussaillage": "Les terrains de vallée se couvrent vite de végétation dense : ronces, roseaux, saules. Nous les reprenons avec un matériel adapté aux sols humides.",
        "entretien-de-jardin": "Nous planifions les passages en tenant compte de l'humidité : travaux lourds quand le sol est ressuyé, entretien courant le reste du temps.",
    },
    "plaine": {
        "elagage": "Dans la plaine, les arbres de jardin sont souvent isolés et très exposés au vent. Sans voisinage pour les abriter, ils développent des couronnes denses que nous éclaircissons pour limiter les risques.",
        "jardinier": "Les jardins de plaine sont ouverts, exposés et parfois grands : nous organisons des passages réguliers pour tonte, haies et ramassage, avec un matériel adapté aux surfaces.",
        "taille-de-haie": "En terrain ouvert, les haies jouent le rôle de brise-vent et de clôture. Nous les taillons régulièrement pour qu'elles restent denses et ne gênent ni la route ni le voisin.",
        "tonte-de-pelouse": "Sur les grandes pelouses ouvertes, une tonte régulière avec du matériel adapté aux surfaces garde un gazon uniforme, avec bordures nettes.",
        "debroussaillage": "En plaine, les terrains laissés à l'abandon se couvrent vite de ronces et d'orties : nous les reprenons et pouvons ensuite les entretenir chaque année.",
        "entretien-de-jardin": "Jardins ouverts et grandes surfaces : nous proposons des passages calés sur la pousse, avec un devis ferme annuel ou saisonnier.",
    },
}

CAS = {
    "elagage": [
        ("Un arbre qui touche la toiture", "Une branche qui frotte les tuiles ou obstrue une gouttière : nous la réduisons proprement, à la corde, sans abîmer la couverture."),
        ("Un fruitier à rajeunir", "Pommier, cerisier ou poirier vieillissant : taille de formation et d'éclaircie pour retrouver de la lumière et de la production."),
        ("Du bois mort au-dessus d'un passage", "Bois mort au-dessus d'une allée, d'une terrasse ou d'un portail : nous le retirons avant qu'il ne tombe."),
        ("Un arbre trop grand pour la parcelle", "Conifère ou feuillu devenu trop grand : réduction raisonnée de la couronne, ou abattage si l'arbre ne peut plus être maîtrisé."),
        ("Un arbre proche d'une ligne", "Branches près d'un câble aérien : nous vous conseillons la bonne démarche avant toute taille."),
        ("Après un coup de vent", "Branches cassées ou suspendues dans l'arbre : nous sécurisons en priorité, puis taillons proprement."),
    ],
    "jardinier": [
        ("Un jardin repris après des mois d'absence", "Pelouse haute, massifs envahis, haies débordantes : remise en ordre en un ou deux passages, puis entretien léger."),
        ("Une résidence secondaire à garder nette", "Passages calés sur vos séjours : tonte, haies, ramassage, pour arriver dans un jardin soigné."),
        ("Un jardin trop grand pour le temps disponible", "Nous prenons en charge les travaux lourds, vous gardez le plaisir de planter."),
        ("Un nettoyage de fin de saison", "Feuilles, tailles d'arbustes, désherbage des massifs : tout est fait avant l'hiver."),
        ("Une remise en état avant une vente", "Un jardin net valorise un bien : tonte, haies et nettoyage avant les visites."),
        ("Un jardin à reprendre après un départ", "Jardin laissé sans entretien : nous le reprenons, puis le maintenons si besoin."),
    ],
    "taille-de-haie": [
        ("Une haie de thuyas devenue trop haute", "Taille progressive en restant dans le vert : les thuyas ne repartent pas du bois nu."),
        ("Un laurier qui déborde sur la voie", "Taille au sécateur ou à la cisaille pour garder des feuilles intactes et un bord net."),
        ("Une charmille à redensifier", "Taille d'hiver franche et paillage pour redonner de la densité à la base."),
        ("Une haie champêtre en bord de chemin", "Taille latérale en hiver, en préservant arbres de haut jet et nichées."),
        ("Une haie mitoyenne à régler avec le voisin", "Devis détaillé pour régler à l'amiable la hauteur avec le voisin."),
        ("Une haie en bord de route", "Taille de visibilité et de sécurité, avec protection de la voie et évacuation immédiate."),
    ],
    "tonte-de-pelouse": [
        ("Une pelouse trop longue", "Reprise en plusieurs passages en baissant la hauteur de coupe progressivement."),
        ("Une tonte régulière toute la saison", "Passage hebdomadaire ou bimensuel en pleine pousse, bordures nettes."),
        ("Un grand terrain d'agrément", "Matériel adapté aux grandes surfaces, avec ramassage ou mulching selon votre choix."),
        ("Un terrain pentu ou accidenté", "Tonte avec un matériel adapté aux pentes et aux obstacles."),
        ("Un terrain à vendre ou à louer", "Une pelouse nette valorise le bien : tonte avant visites ou état des lieux."),
        ("Une pelouse à regarnir", "Après la tonte, conseil sur le regarnissage et l'aération si besoin."),
    ],
    "debroussaillage": [
        ("Un terrain envahi par les ronces", "Dégagement des ronciers, avec arrachage des souches principales pour limiter le retour."),
        ("Un talus ou un fossé fermé", "Reprise des talus et abords de chemin pour dégager la vue et l'écoulement."),
        ("Une friche avant construction ou vente", "Terrain dégagé pour permettre le bornage, la visite ou les travaux."),
        ("Un verger à rouvrir", "Dégagement autour des arbres fruitiers pour les remettre en valeur."),
        ("Une parcelle à entretenir chaque année", "Passage annuel pour éviter que le terrain ne se referme."),
        ("Un terrain avec arbres à conserver", "Nous repérons avec vous ce qui doit rester avant de commencer."),
    ],
    "entretien-de-jardin": [
        ("Un forfait saisonnier", "Passages calés sur les saisons : tonte, taille, désherbage, ramassage."),
        ("Un entretien mensuel", "Un passage par mois pour garder un jardin net sans surcoût."),
        ("Un jardin à remettre en état", "Gros nettoyage initial, puis entretien allégé."),
        ("Un jardin pour location saisonnière", "Passages avant chaque rotation pour un accueil soigné."),
        ("Un jardin d'entreprise ou de gîte", "Entretien régulier, horaires adaptés à votre activité."),
        ("Un jardin à adapter à l'âge", "Entretien complet pour que vous profitiez du jardin sans effort."),
    ],
}

TIPS = {
    "elagage": ["Photographiez l'arbre sous deux angles avant de nous appeler.", "Notez la hauteur approximative et la distance à la maison.", "Dites-nous si une ligne aérienne passe près de l'arbre.", "Précisez si l'accès se fait par un portail ou par la maison.", "Indiquez si vous souhaitez garder le bois.", "Signalez les clôtures et plantations à protéger.", "Dites-nous si un voisin est concerné par l'arbre.", "Précisez si l'arbre est en limite de propriété."],
    "jardinier": ["Indiquez la surface approximative du jardin.", "Précisez s'il y a une pelouse, des haies, des massifs.", "Dites-nous quels passages vous voulez : ponctuel ou régulier.", "Signalez l'accès et la possibilité d'évacuer les déchets.", "Précisez la fréquence souhaitée des passages.", "Indiquez si le jardin est une résidence secondaire.", "Signalez les plantes fragiles à épargner.", "Dites-nous s'il y a un point d'eau accessible."],
    "taille-de-haie": ["Mesurez la longueur de la haie, même approximativement.", "Indiquez l'essence : thuya, laurier, charmille, mélange.", "Précisez la hauteur actuelle et la hauteur souhaitée.", "Dites-nous si la haie est mitoyenne.", "Signalez l'accès des deux côtés de la haie.", "Précisez si les déchets doivent être évacués ou broyés.", "Indiquez la dernière année de taille.", "Signalez la présence éventuelle d'un nid."],
    "tonte-de-pelouse": ["Indiquez la surface de la pelouse.", "Précisez la hauteur actuelle de l'herbe.", "Dites-nous si l'herbe doit être ramassée.", "Signalez les pentes et obstacles.", "Précisez la fréquence souhaitée.", "Indiquez l'accès au terrain.", "Dites-nous si des animaux circulent dans le jardin.", "Précisez la date limite si c'est avant une visite."],
    "debroussaillage": ["Indiquez la surface approximative du terrain.", "Précisez la nature de la végétation : ronces, orties, arbustes.", "Signalez les arbres ou haies à conserver.", "Dites-nous si le terrain est en pente.", "Précisez si des clôtures ou fossés sont cachés.", "Indiquez si les déchets doivent être broyés ou évacués.", "Précisez l'usage futur du terrain.", "Signalez l'accès pour les engins."],
    "entretien-de-jardin": ["Décrivez le jardin : pelouse, haies, massifs, arbres.", "Indiquez la fréquence de passages souhaitée.", "Précisez les périodes de présence ou d'absence.", "Dites-nous le budget annuel visé.", "Signalez les travaux à faire en priorité.", "Indiquez l'accès et le point d'eau.", "Précisez si vous avez des animaux.", "Dites-nous si vous voulez un forfait ou des passages à la demande."],
}

KIND_FAQ = {
    "littoral": ("Le vent et le sel changent-ils {sv} à {c} ?", "Oui. Près de la mer, nous adaptons la période, la sévérité des coupes et le choix des essences au vent et aux embruns, pour que les plantations reprennent bien."),
    "centre": ("L'accès est étroit à {c}, est-ce un problème pour {sv} ?", "Rarement. Nous choisissons la méthode selon l'accès : travail à la corde, matériel compact, évacuation à la main si besoin. Nous repérons tout cela lors de la visite."),
    "herbages": ("Intervenez-vous sur de grands terrains à {c} ?", "Oui. Grands jardins, vergers, bordures de chemins : nous planifions le chantier selon la surface, avec un matériel adapté."),
    "vallee": ("L'humidité de {c} pose-t-elle problème pour {sv} ?", "Elle demande de l'organisation : nous évitons les sols détrempés et choisissons les bonnes périodes pour ne pas abîmer le terrain."),
    "plaine": ("Les terrains ouverts de {c} demandent-ils une approche particulière pour {sv} ?", "Les terrains ouverts sont plus exposés au vent et plus grands. Nous adaptons le matériel et le rythme de passage à la surface."),
}


def _h(name, salt, n):
    return int(hashlib.md5((name + salt).encode()).hexdigest(), 16) % n


def _choose(name, salt, items, k):
    idx, out, i = set(), [], 0
    while len(out) < k and i < 200:
        j = _h(name, salt + str(i), len(items))
        if j not in idx:
            idx.add(j)
            out.append(items[j])
        i += 1
    return out


def enrich(page, row, arch, listfr):
    c, svc = page["city"], page["serviceSlug"]
    kind = FACTS.get(c, (DEFAULT_KIND.get(arch, "herbages"), ""))[0]
    fact = FACTS.get(c, (None, ""))[1]
    dep = DEPS.get(row["dep"], "")
    nb = row["nb"]
    if c == "Lisieux":
        geo = "Lisieux est notre ville de base : nous y sommes sur place, sans frais de déplacement."
    else:
        geo = (f"{c} se trouve {row['dir']} de Lisieux, à environ {row['d']} km à vol d'oiseau, dans le département {('du ' + dep) if dep else ''}."
               .replace("département du Calvados", "Calvados").replace("département du Eure", "Eure").replace("département du Orne", "Orne"))
        geo = f"{c} est située {row['dir']} de Lisieux, à environ {row['d']} km à vol d'oiseau ({dep}). Ses communes voisines : {listfr(nb[:4])}."
    p1 = (fact + " " + geo).strip()
    p2 = ANGLE[kind][svc]
    p3 = f"Si vous êtes à {nb[0]} ou à {nb[1]}, nous pouvons regrouper les passages avec ceux de {c} pour limiter les déplacements."
    local = {"h2": _choose(c, svc + "h", [x.format(c=c) for x in H2[svc]], 1)[0], "paras": [p1, p2, p3]}
    cas = [{"t": t, "x": x} for t, x in _choose(c, svc + "cas", CAS[svc], 3)]
    tips = _choose(c, svc + "tip", TIPS[svc], 4)
    q, a = KIND_FAQ[kind]
    sv = SERVICE_LABEL[svc]
    extra_faq = [{"q": q.format(c=c, sv=sv), "a": a},
                 {"q": f"Puis-je vous appeler directement pour {sv} à {c} ?", "a": "Oui, c'est le plus simple : un appel suffit pour décrire votre besoin et fixer une visite gratuite. Nous vous rappelons si nous sommes sur un chantier."}]
    return local, cas, tips, extra_faq
