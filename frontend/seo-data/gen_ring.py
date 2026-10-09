#!/usr/bin/env python3
"""Génère src/data/localPagesRing.js : pages locales (élagage, jardinier, taille de haie) pour les communes
dans ~36 km autour de Lisieux. Données réelles (population, distance à vol d'oiseau, communes voisines) issues de
geo.api.gouv.fr ; aucune information locale inventée : les conseils sont des généralités horticoles propres à chaque
type de territoire (littoral, plaine, bocage, vallée de la Risle...)."""
import hashlib, json, os, re, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "data", "localPagesRing.js")
PHONE = "07 67 23 41 23"

COAST = {"Blonville-sur-Mer", "Villers-sur-Mer", "Deauville", "Trouville-sur-Mer", "Houlgate", "Merville-Franceville-Plage", "Touques"}
HONFLEUR = {"Honfleur", "Équemauville", "La Rivière-Saint-Sauveur"}
PLAIN = {"Troarn", "Moult-Chicheboville", "Bavent", "Valambray", "Sannerville", "Bellengreville", "Frénouville", "Cagny", "Cuverville", "Démouville"}
EURE = {"Épaignes", "Beuzeville", "Bernay", "Menneval", "Pont-Audemer", "Brionne", "Serquigny"}
# tout le reste : arrière-pays augeron (Saint-Désir, Valorbiquet...)


def slugify(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def h(name, salt, n):
    return int(hashlib.md5((name + salt).encode()).hexdigest(), 16) % n


def pick(name, salt, options):
    return options[h(name, salt, len(options))]


def archetype(name, pop):
    if name in COAST:
        return "coast"
    if name in HONFLEUR:
        return "honfleur"
    if name in PLAIN:
        return "plain"
    if name in EURE:
        return "eure"
    return "auge"


def km_phrase(d):
    return f"à environ {d} km de Lisieux" if d > 3 else "aux portes de Lisieux"


def pop_fmt(p):
    return f"{p:,}".replace(",", " ")


def size_word(p):
    if p >= 8000:
        return "ville"
    if p >= 3000:
        return "bourg important"
    return "commune"


# ---------------------------------------------------------------- contenus
ARCH = {
    "elagage": {
        "coast": [
            "Sur la côte, les arbres vivent sous le vent et les embruns : pins, cyprès, tamaris et chênes verts y prennent des silhouettes couchées par les tempêtes. Une taille d'allègement bien menée réduit la prise au vent sans dénaturer l'arbre.",
            "Le climat marin use les arbres autrement qu'à l'intérieur des terres : branches cassées par les coups de vent, feuillage brûlé par le sel, couronnes déséquilibrées d'un seul côté. Nous rééquilibrons la couronne et supprimons le bois fragilisé.",
            "Les jardins du littoral combinent grands sujets exposés et terrains souvent légers. Après un épisode venteux, nous contrôlons les charpentières, retirons le bois mort et sécurisons ce qui menace une toiture, une véranda ou une clôture.",
            "Près de la mer, un arbre mal taillé offre trop de prise au vent. Nous privilégions des coupes propres, de petit diamètre, qui cicatrisent bien et laissent l'arbre résister aux tempêtes d'automne et d'hiver.",
        ],
        "honfleur": [
            "Autour de l'estuaire de la Seine, le vent et l'humidité marquent les arbres des jardins : pommiers, chênes, tilleuls et arbres de parc demandent une surveillance régulière pour rester sains et bien équilibrés.",
            "Entre plateau et estuaire, les propriétés ont souvent de grands arbres anciens près des maisons. Nous réalisons des tailles d'entretien et de sécurisation qui préservent le sujet tout en protégeant toitures et dépendances.",
            "Les jardins du pays d'Honfleur mêlent arbres fruitiers, essences d'ornement et sujets plus imposants. Chaque essence a sa période et sa technique de taille : nous adaptons la coupe à l'arbre et à son environnement immédiat.",
        ],
        "plain": [
            "Dans la plaine, les arbres de jardin sont souvent isolés et très exposés au vent : sans voisinage pour les abriter, ils développent des couronnes denses qu'il faut éclaircir régulièrement pour limiter la prise au vent.",
            "Les terrains ouverts de la plaine offrent de beaux sujets, mais aussi des arbres plantés trop près des maisons il y a plusieurs années. Une taille d'entretien suffit souvent à retrouver de la lumière et à écarter les branches des toitures.",
            "Peupliers, érables, bouleaux et fruitiers poussent vite en terrain ouvert. Nous les taillons avant qu'ils ne gênent une façade, une ligne ou un voisin, en suivant leur port naturel.",
        ],
        "eure": [
            "De l'autre côté de la limite départementale, dans l'Eure, nous intervenons comme dans le Calvados : diagnostic gratuit, taille adaptée à l'essence, chantier propre. Les jardins du secteur mêlent feuillus de belle taille et arbres fruitiers.",
            "Les vallées et plateaux de ce secteur de l'Eure comptent de grands arbres de parc et de nombreux fruitiers. Nous les taillons selon leur âge et leur état, avec le souci de préserver l'arbre.",
            "Qu'il s'agisse d'un grand chêne, d'un tilleul de cour ou d'un pommier de verger, la taille se décide arbre par arbre. Nous passons sur place, évaluons l'état sanitaire et proposons une taille raisonnée.",
        ],
        "auge": [
            "Le bocage augeron est un pays de pommiers, de haies vives et de grands arbres près des fermes et des maisons. Taille de fruitiers, éclaircie de chênes et de tilleuls, sécurisation de branches : nous connaissons ce terrain.",
            "Dans les jardins du Pays d'Auge, les arbres sont souvent anciens et proches des bâtiments. Nous privilégions une taille douce et régulière, bien plus saine pour l'arbre qu'une coupe sévère tous les dix ans.",
            "Pommiers à cidre, noyers, chênes, hêtres : les essences du bocage ont leurs périodes de taille et leurs fragilités. Nous adaptons la technique à chaque arbre, en limitant la taille des plaies.",
        ],
    },
    "jardinier": {
        "coast": [
            "Le jardin du bord de mer a ses contraintes : vent chargé d'embruns, sols souvent légers, pelouses qui sèchent vite l'été. Nous organisons l'entretien en conséquence : tonte régulière, taille des haies résistantes, désherbage des massifs.",
            "Entretenir un jardin près de la côte, c'est composer avec le sel et le vent. Les haies brise-vent, les massifs d'hortensias et les pelouses demandent une attention régulière que nous assurons toute l'année.",
            "Résidences secondaires ou maisons principales : nous entretenons les jardins du littoral avec des passages réguliers, y compris en votre absence, pour retrouver une propriété nette à chaque retour.",
            "Pelouse, haies, massifs, terrasses : l'entretien d'un jardin proche de la mer est un travail de régularité. Nous proposons des passages ponctuels ou réguliers, adaptés à la saison et à la taille du terrain.",
        ],
        "honfleur": [
            "Les jardins du pays d'Honfleur allient pelouses, massifs, haies et arbres fruitiers. Nous assurons tonte, taille, désherbage et ramassage, au rythme qui vous convient, ponctuellement ou toute l'année.",
            "Que votre maison soit en ville ou sur le plateau, nous entretenons le jardin comme s'il était le nôtre : tonte soignée, taille des haies, nettoyage des massifs et évacuation des déchets verts.",
            "Entretien régulier ou remise en ordre avant l'été : nous nous adaptons à votre jardin, à sa taille et à son usage, avec un devis clair avant chaque intervention.",
        ],
        "plain": [
            "Dans la plaine, les jardins de lotissements et les grands terrains ouverts demandent un entretien régulier : tonte, taille des haies de séparation, désherbage et nettoyage de fin de saison.",
            "Les terrains plats et dégagés se tondent vite, mais les haies et les massifs réclament du soin. Nous proposons des passages adaptés à la surface du jardin et à vos habitudes.",
            "Pelouse du quotidien, haie de thuyas, massif de vivaces : nous entretenons les jardins du secteur avec des passages planifiés, pour que le jardin reste net sans que vous ayez à vous en occuper.",
        ],
        "eure": [
            "Nous entretenons aussi les jardins de ce secteur de l'Eure : tonte, taille des haies, désherbage, ramassage des feuilles. Un devis gratuit après visite, puis des passages réguliers si vous le souhaitez.",
            "Jardin de ville, parcelle de campagne ou propriété plus vaste : l'entretien se planifie selon la surface et la saison. Nous passons sur place, chiffrons, puis intervenons à la date convenue.",
            "Qu'il s'agisse d'une remise en ordre ou d'un entretien suivi, nous prenons le jardin tel qu'il est : tonte, haies, massifs et évacuation complète des déchets verts.",
        ],
        "auge": [
            "Dans le Pays d'Auge, les jardins sont souvent vastes : grandes pelouses, haies champêtres, vergers. L'entretien demande du temps et du matériel adapté, que nous mettons à votre service à la journée ou à l'année.",
            "Tonte de grandes surfaces, taille de haies, désherbage des massifs, nettoyage des abords : nous entretenons les propriétés du bocage augeron avec des passages réguliers ou ponctuels.",
            "Une propriété de campagne se gère par saison : tonte et débroussaillage au printemps, taille des haies en été, ramassage et nettoyage à l'automne. Nous planifions chaque passage avec vous.",
        ],
    },
    "taille-de-haie": {
        "coast": [
            "Au bord de la mer, les haies jouent le rôle de brise-vent. Il faut les tailler avec soin : une haie trop sévèrement taillée souffre du vent et du sel, une haie négligée perd en densité. Nous trouvons l'équilibre.",
            "Cyprès, lauriers, escallonias, griselinias, tamaris : les haies du littoral sont soumises au vent et aux embruns. Nous les taillons à la bonne période et à la bonne hauteur pour garder un feuillage dense.",
            "Une haie proche de la mer s'entretient plusieurs fois dans la saison si l'on veut un rendu net. Nous proposons des passages réguliers ou une taille annuelle, avec évacuation complète des déchets.",
        ],
        "honfleur": [
            "Les haies du pays d'Honfleur séparent souvent des jardins de ville ou protègent des propriétés plus ouvertes. Thuyas, lauriers, charmilles : nous les taillons au cordeau, y compris en hauteur grâce à un matériel adapté.",
            "Une haie bien taillée garde son intimité au jardin sans empiéter sur le voisin. Nous réalisons la taille de toutes les essences, avec nettoyage complet à la fin du chantier.",
            "Taille d'entretien ou reprise d'une haie négligée : nous évaluons la haie sur place avant de vous remettre un devis gratuit, en tenant compte de la hauteur, de la longueur et de l'accès.",
        ],
        "plain": [
            "Dans la plaine, les haies de thuyas, de lauriers et de photinias bordent les jardins et filtrent le vent. Une taille régulière évite qu'elles ne montent trop haut et ne se dégarnissent à la base.",
            "Les terrains dégagés exigent des haies solides. Nous les taillons avec le bon outil selon la hauteur, en prenant soin de ne pas couper dans le vieux bois des résineux qui ne repoussent pas.",
            "Haie de séparation entre voisins, haie d'entrée, haie brise-vent : chaque haie a un rôle. Nous la taillons en conséquence, avec une finition nette et un chantier laissé propre.",
        ],
        "eure": [
            "Nous taillons aussi les haies de ce secteur de l'Eure : thuyas, lauriers, charmilles, haies champêtres. Devis gratuit après visite, intervention à la date convenue, déchets évacués.",
            "Que votre haie soit récente ou ancienne, la bonne taille dépend de l'essence. Nous respectons le port de chaque haie, y compris pour les haies champêtres qui demandent une taille moins sévère.",
            "Taille en hauteur, taille de remise en forme ou entretien annuel : nous nous adaptons à la haie, à son accès et à votre calendrier.",
        ],
        "auge": [
            "Dans le Pays d'Auge, les haies vives (charme, noisetier, aubépine) se taillent moins sévèrement que du laurier : une taille latérale annuelle suffit à les garder denses. Nous adaptons la taille à chaque haie.",
            "Haies de clôture, haies champêtres, haies de thuyas ou de lauriers autour de la maison : nous les entretenons toutes, en tenant compte de l'essence et de la période de nidification des oiseaux.",
            "Une haie de campagne peut mesurer plusieurs dizaines de mètres. Nous intervenons avec le matériel adapté, sur une journée ou plusieurs, et nous évacuons ou broyons les déchets.",
        ],
    },
}

GENERIC_B = {
    "elagage": [
        "Un élagage se prépare : nous regardons l'essence, l'état sanitaire, l'accès et ce qui se trouve sous l'arbre (toiture, clôture, terrasse). Le diagnostic est gratuit, et le devis annoncé est le prix final.",
        "La bonne période d'élagage dépend de l'arbre et de l'objectif. Beaucoup d'arbres se taillent en dehors de la pleine végétation, mais un arbre dangereux se traite sans attendre.",
        "Une taille raisonnée vaut mieux qu'une coupe radicale : elle préserve la santé de l'arbre, limite les rejets et reste discrète dans le paysage. C'est notre principe sur tous nos chantiers.",
        "Après une tempête, appelez-nous : nous évaluons les branches fragilisées, sécurisons ce qui doit l'être et taillons proprement ce qui peut être conservé.",
        "Nous travaillons avec un matériel professionnel et nous protégeons le jardin pendant l'intervention : terrasse, pelouse, haies mitoyennes et plantations restent intactes.",
    ],
    "jardinier": [
        "Un entretien de jardin réussi repose sur la régularité. Nous vous proposons un passage ponctuel ou un entretien suivi, avec une visite gratuite et un devis clair avant de commencer.",
        "Tonte, taille, désherbage, ramassage : nous réalisons l'ensemble des travaux courants et nous évacuons les déchets verts, pour que vous retrouviez un jardin net après chaque passage.",
        "Au printemps, remise en ordre et premières tontes ; en été, entretien courant ; à l'automne, ramassage et taille de saison. Nous organisons l'année avec vous, saison par saison.",
        "Débroussaillage d'un terrain laissé à l'abandon, remise en état d'une pelouse, taille d'arbustes : nous prenons aussi les gros chantiers de remise en état avant un entretien régulier.",
        "Nous intervenons chez les particuliers comme chez les professionnels et les propriétaires de résidences secondaires, avec un point de contact unique : un appel suffit.",
    ],
    "taille-de-haie": [
        "La période de taille dépend de l'essence. Il vaut mieux éviter la pleine période de nidification des oiseaux, d'avril à juillet environ, sauf nécessité, et tailler plutôt à la fin de l'été ou au début de l'automne.",
        "Une haie se taille légèrement et souvent plutôt que fortement et rarement. Les résineux comme le thuya ne repoussent pas dans le vieux bois : nous évaluons toujours la haie avant de couper.",
        "Taille au cordeau, finitions à la cisaille, évacuation ou broyage des déchets : le chantier est conduit jusqu'au bout et le jardin laissé propre.",
        "Nous taillons les haies en hauteur avec un matériel adapté et en sécurité, y compris les grandes haies de thuyas qui dépassent la toiture d'une maison.",
        "Nous intervenons ponctuellement ou chaque année : une haie taillée à intervalles réguliers reste dense, solide et facile à entretenir.",
    ],
}

PRESTA = {
    "elagage": [
        "Taille douce d'arbres d'ornement", "Taille de pommiers et d'arbres fruitiers", "Ébranchage au-dessus des toitures",
        "Remontée de couronne", "Suppression du bois mort", "Sécurisation après tempête", "Éclaircie de couronnes denses",
        "Démontage contrôlé des arbres dangereux", "Évacuation ou broyage des branches", "Taille de formation des jeunes arbres",
    ],
    "jardinier": [
        "Tonte de pelouse et finitions", "Taille de haies et d'arbustes", "Désherbage des massifs et allées",
        "Débroussaillage de terrains", "Ramassage des feuilles", "Nettoyage de fin de saison", "Taille de rosiers et de vivaces",
        "Évacuation des déchets verts", "Entretien régulier ou ponctuel", "Remise en état d'un jardin négligé",
    ],
    "taille-de-haie": [
        "Taille de haies de thuyas", "Taille de lauriers et photinias", "Taille de haies champêtres", "Taille de charmilles",
        "Taille en hauteur avec matériel adapté", "Remise en forme d'une haie négligée", "Taille d'entretien annuelle",
        "Évacuation ou broyage des déchets", "Taille au cordeau et finitions", "Réduction en hauteur d'une haie trop haute",
    ],
}

SHORT = {"elagage": "Élagage", "jardinier": "Jardinier", "taille-de-haie": "Taille de haie"}
TITLE_NAME = {"elagage": "Élagage", "jardinier": "Jardinier", "taille-de-haie": "Taille de haie"}
OVERLINE = {"elagage": "Élagueur", "jardinier": "Jardinier", "taille-de-haie": "Taille de haie"}

H1 = {
    "elagage": ["Élagage à {c} : vos arbres entre de bonnes mains", "Élagueur à {c} : taille soignée et chantier propre", "Élagage d'arbres à {c} : diagnostic gratuit"],
    "jardinier": ["Jardinier à {c} : entretien régulier ou ponctuel", "Jardinier à {c} : un jardin net, toute l'année", "Entretien de jardin à {c} : appelez, on passe"],
    "taille-de-haie": ["Taille de haie à {c} : des lignes nettes", "Taille de haies à {c} : thuyas, lauriers, charmilles", "Taille de haie à {c} : devis gratuit après visite"],
}

INTRO = {
    "elagage": [
        "{c} ({dir}, {kmp}) est dans notre secteur d'intervention. Multi Taille Services élague les arbres des jardins et des propriétés de la commune : taille douce, fruitiers, sécurisation, évacuation des branches. Un appel suffit pour fixer une visite gratuite.",
        "Vous cherchez un élagueur à {c} ? Nous intervenons {kmp}, avec un diagnostic gratuit sur place, une taille respectueuse de l'arbre et un chantier rendu propre. Appelez-nous pour obtenir un devis ferme.",
        "À {c}, {pop} habitants, les arbres des jardins demandent un suivi régulier. Nous nous déplaçons {kmp} pour évaluer vos arbres, proposer la taille adaptée et réaliser le chantier en sécurité.",
    ],
    "jardinier": [
        "{c} ({dir}, {kmp}) fait partie des communes où nous entretenons les jardins : tonte, taille, désherbage, évacuation des déchets verts. Appelez-nous pour une visite gratuite et un devis clair.",
        "Besoin d'un jardinier à {c} ? Nous intervenons {kmp}, ponctuellement ou toute l'année, avec du matériel professionnel et un point de contact unique : un simple appel.",
        "À {c}, {pop} habitants, l'entretien d'un jardin prend vite du temps. Nous prenons le relais : passages réguliers, remise en état avant l'été, ramassage de fin de saison.",
    ],
    "taille-de-haie": [
        "{c} ({dir}, {kmp}) est dans notre zone d'intervention. Multi Taille Services taille les haies des particuliers : thuyas, lauriers, photinias, charmilles, haies champêtres, avec évacuation des déchets.",
        "Votre haie est trop haute, trop large ou dégarnie à {c} ? Nous intervenons {kmp} pour la tailler proprement, avec le matériel adapté à la hauteur. Visite et devis gratuits.",
        "À {c}, {pop} habitants, les haies sont partout : clôtures, brise-vent, séparations. Nous les taillons ponctuellement ou chaque année, avec un chantier toujours laissé propre.",
    ],
}

FAQ_PRICE = [
    "Quel est le prix d'{a} à {c} ?",
    "Combien coûte {b} à {c} ?",
    "Comment est calculé le devis pour {b} à {c} ?",
]
NOUNS = {
    "elagage": ("un élagage", "un élagage"),
    "jardinier": ("un entretien de jardin", "un entretien de jardin"),
    "taille-de-haie": ("une taille de haie", "une taille de haie"),
}

FAQ_PRICE_A = {
    "elagage": [
        "Le prix d'un élagage dépend de la hauteur de l'arbre, de l'accès, du volume à tailler et de l'évacuation des branches. Nous passons voir l'arbre gratuitement à {c}, puis nous vous remettons un devis ferme : vous ne payez que ce qui est annoncé.",
        "Chaque arbre est différent : essence, hauteur, état, accès. C'est pourquoi nous ne donnons pas de prix au téléphone sans avoir vu l'arbre. La visite est gratuite et le devis qui suit est détaillé.",
    ],
    "jardinier": [
        "Le prix dépend de la surface du jardin, de la nature des travaux (tonte, haies, désherbage, débroussaillage) et de la fréquence souhaitée. Nous passons sur place à {c}, puis nous vous remettons un devis clair, sans surprise.",
        "Un entretien ponctuel et un entretien régulier ne se chiffrent pas de la même façon. Après une visite gratuite, nous vous proposons la formule adaptée à votre jardin et à votre budget.",
    ],
    "taille-de-haie": [
        "Le prix dépend de la longueur de la haie, de sa hauteur, de son essence et de l'accès. Nous passons sur place à {c} sans frais, puis nous vous remettons un devis ferme avec l'évacuation des déchets.",
        "Une haie de trente mètres à deux mètres de haut ne se chiffre pas comme une haie de dix mètres à un mètre cinquante. Visite gratuite, devis détaillé, prix ferme.",
    ],
}

FAQ_SPECIFIC = {
    "elagage": [
        ("Un arbre a perdu de grosses branches après le vent, que faire ?", "Appelez-nous sans attendre : une charpentière fendue peut lâcher sans prévenir. Nous évaluons l'arbre, sécurisons la zone si nécessaire, puis réalisons une taille de sécurisation ou, si l'arbre est trop compromis, un démontage contrôlé."),
        ("Taillez-vous aussi les arbres fruitiers ?", "Oui : pommiers, poiriers, cerisiers et autres fruitiers sont taillés selon leur âge et l'objectif recherché (fructification, forme, sécurité). Nous passons sur place pour définir la taille à réaliser."),
        ("Évacuez-vous les branches après l'élagage ?", "Oui. Les branches sont évacuées ou broyées, selon ce qui est prévu au devis, et le jardin est ratissé : nous ne partons que lorsque le chantier est propre."),
    ],
    "jardinier": [
        ("Proposez-vous un entretien régulier ?", "Oui : passages hebdomadaires, bimensuels ou mensuels selon la saison et la taille du jardin, ou interventions ponctuelles. Nous fixons ensemble le rythme et nous planifions les passages."),
        ("Pouvez-vous remettre en état un jardin laissé à l'abandon ?", "Oui. Nous débroussaillons, tondons, taillons et évacuons, puis nous proposons un entretien régulier pour que le jardin ne se referme pas. La visite préalable est gratuite."),
        ("Évacuez-vous les déchets verts ?", "Oui, les déchets verts sont évacués ou broyés selon le devis. Vous retrouvez un jardin propre après chaque passage."),
    ],
    "taille-de-haie": [
        ("À quelle période faut-il tailler une haie ?", "Cela dépend de l'essence. Il vaut mieux éviter la pleine période de nidification, d'avril à juillet environ, sauf nécessité, et tailler plutôt à la fin de l'été ou au début de l'automne. Nous vous conseillons sur place."),
        ("Pouvez-vous tailler une haie très haute ?", "Oui, avec le matériel adapté et en sécurité. Pour les résineux comme le thuya, nous évaluons d'abord la haie : ils ne repoussent pas depuis le vieux bois, donc nous ne descendons pas la hauteur n'importe comment."),
        ("Évacuez-vous les déchets de taille ?", "Oui. L'évacuation ou le broyage est prévu dans le devis, et le jardin est laissé propre."),
    ],
}

FAQ_ZONE_Q = ["Intervenez-vous dans les communes voisines de {c} ?", "Quelles communes autour de {c} desservez-vous ?"]
FAQ_ZONE_A = [
    "Oui : nous intervenons à {c} et dans les communes voisines, notamment {nb}. Basés à Lisieux, nous nous déplaçons dans un rayon d'environ 50 km.",
    "Nous desservons {c} et ses environs : {nb}, ainsi que l'ensemble du secteur de Lisieux et du Pays d'Auge. Un appel suffit pour savoir quand nous pouvons passer.",
]


def listfr(items):
    return ", ".join(items[:-1]) + " et " + items[-1] if len(items) > 1 else items[0]


def build():
    rows = []
    for line in open(os.path.join(HERE, "communes_ring.txt"), encoding="utf-8"):
        line = line.strip()
        if not line:
            continue
        n, p, d, dep, direction, nb = line.split("|")
        rows.append(dict(n=n, p=int(p), d=int(d), dep=dep, dir=direction, nb=nb.split(",")))

    pages = []
    for r in rows:
        c = r["n"]
        arch = archetype(c, r["p"])
        for svc in ("elagage", "jardinier", "taille-de-haie"):
            slug = f"{svc}-{slugify(c)}"
            kmp = km_phrase(r["d"])
            ctx = dict(c=c, dir=r["dir"], kmp=kmp, pop=pop_fmt(r["p"]))
            name = TITLE_NAME[svc]
            title = f"{name} à {c} | Multi Taille Services"
            if len(title) > 60:
                title = f"{name} à {c} | Multi Taille"
            if len(title) > 60:
                title = f"{name} à {c}"
            meta_opts = {
                "elagage": [
                    f"Élagueur à {c} ({r['dir']} de Lisieux) : taille douce, fruitiers, sécurisation, déchets évacués. Visite et devis gratuits. Appelez le {PHONE}.",
                    f"Élagage d'arbres à {c} : diagnostic gratuit, taille raisonnée, chantier propre. Multi Taille Services, basé à Lisieux. Appelez le {PHONE}.",
                    f"Besoin d'un élagueur à {c} ? Visite gratuite, devis ferme, taille soignée et évacuation des branches. Appel direct : {PHONE}.",
                ],
                "jardinier": [
                    f"Jardinier à {c} : tonte, taille de haies, désherbage, évacuation des déchets verts. Passage ponctuel ou régulier, devis gratuit. Appelez le {PHONE}.",
                    f"Entretien de jardin à {c} ({r['dir']} de Lisieux) : jardinier professionnel, visite et devis gratuits. Multi Taille Services : {PHONE}.",
                    f"Un jardinier à {c} pour tondre, tailler et désherber : devis gratuit après visite, déchets évacués. Appel direct : {PHONE}.",
                ],
                "taille-de-haie": [
                    f"Taille de haie à {c} : thuyas, lauriers, charmilles, haies champêtres. Visite et devis gratuits, déchets évacués. Appelez le {PHONE}.",
                    f"Taille de haies à {c} ({r['dir']} de Lisieux) : matériel adapté aux grandes hauteurs, chantier propre. Multi Taille Services : {PHONE}.",
                    f"Une haie à tailler à {c} ? Devis gratuit après visite, taille au cordeau et évacuation des déchets. Appel direct : {PHONE}.",
                ],
            }[svc]
            meta = pick(c, svc + "m", meta_opts)
            besoins_h2 = {
                "elagage": [f"Les arbres de {c}", f"Élaguer à {c} : ce qu'il faut savoir", f"Des arbres bien taillés à {c}"],
                "jardinier": [f"Entretenir un jardin à {c}", f"Les jardins de {c}", f"Un jardin net à {c}"],
                "taille-de-haie": [f"Les haies de {c}", f"Tailler une haie à {c}", f"Des haies bien taillées à {c}"],
            }[svc]
            nb3 = r["nb"][:5]
            near_para = (
                f"{c} compte {pop_fmt(r['p'])} habitants et se situe {kmp}, {r['dir']}. "
                f"Nous intervenons aussi dans les communes voisines : {listfr(nb3)}. "
                f"Le déplacement est inclus dans le devis, sans mauvaise surprise."
            )
            prest = [PRESTA[svc][(h(c, svc + "p", 10) + i * 3) % 10] for i in range(6)]
            prest = list(dict.fromkeys(prest))
            for x in PRESTA[svc]:
                if len(prest) >= 6:
                    break
                if x not in prest:
                    prest.append(x)
            art_a, art_b = NOUNS[svc]
            q_price = pick(c, svc + "q", FAQ_PRICE).format(a=art_a.split(" ", 1)[1] if False else art_a, b=art_b, c=c)
            q_price = pick(c, svc + "q", [
                f"Quel est le prix d'{art_a} à {c} ?" if art_a.startswith("un é") else f"Quel est le prix d'{art_a} à {c} ?",
                f"Combien coûte {art_a} à {c} ?",
                f"Comment est calculé le devis pour {art_a} à {c} ?",
            ])
            if q_price.startswith("Quel est le prix d'une") or q_price.startswith("Quel est le prix d'un "):
                q_price = q_price.replace("d'une", "d'une").replace("d'un ", "d'un ")
            fq_s = FAQ_SPECIFIC[svc][h(c, svc + "f", 3)]
            faq = [
                {"q": q_price, "a": pick(c, svc + "pa", FAQ_PRICE_A[svc]).format(c=c)},
                {"q": fq_s[0], "a": fq_s[1]},
                {"q": pick(c, "zq", FAQ_ZONE_Q).format(c=c), "a": pick(c, "za", FAQ_ZONE_A).format(c=c, nb=listfr(nb3[:4]))},
            ]
            pages.append({
                "slug": slug,
                "serviceSlug": svc,
                "citySlug": slugify(c),
                "city": c,
                "shortName": SHORT[svc],
                "title": title,
                "meta": meta,
                "h1": pick(c, svc + "h1", H1[svc]).format(c=c),
                "overline": f"{OVERLINE[svc]} à {c}, à {r['d']} km de Lisieux" if r["d"] > 3 else f"{OVERLINE[svc]} à {c}, aux portes de Lisieux",
                "intro": pick(c, svc + "i", INTRO[svc]).format(**ctx),
                "besoins": {
                    "h2": pick(c, svc + "h2", besoins_h2),
                    "paras": [
                        pick(c, svc + "A", ARCH[svc][arch]),
                        pick(c, svc + "B", GENERIC_B[svc]),
                        near_para,
                    ],
                },
                "prestations": prest,
                "communes": nb3,
                "faq": faq,
            })
    return pages


if __name__ == "__main__":
    pages = build()
    js = "// Fichier généré par seo-data/gen_ring.py : ne pas modifier à la main.\nexport const LOCAL_PAGES_RING = " + json.dumps(pages, ensure_ascii=False, indent=2) + ";\n"
    open(OUT, "w", encoding="utf-8").write(js)
    print(f"{len(pages)} pages écrites dans {OUT}")
