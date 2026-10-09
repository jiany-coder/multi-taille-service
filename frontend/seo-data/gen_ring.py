#!/usr/bin/env python3
"""Génère src/data/localPagesRing.js : pages locales (élagage, jardinier, taille de haie) pour les communes
dans ~36 km autour de Lisieux. Données réelles (population, distance à vol d'oiseau, communes voisines) issues de
geo.api.gouv.fr ; aucune information locale inventée : les conseils sont des généralités horticoles propres à chaque
type de territoire (littoral, plaine, bocage, vallée de la Risle...)."""
import hashlib, json, os, re, unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "data", "localPagesRing.js")
PHONE = "07 67 23 41 23"

COAST = {"Cabourg", "Dives-sur-Mer", "Blonville-sur-Mer", "Villers-sur-Mer", "Deauville", "Trouville-sur-Mer", "Houlgate", "Merville-Franceville-Plage", "Touques"}
HONFLEUR = {"Honfleur", "Équemauville", "La Rivière-Saint-Sauveur"}
PLAIN = {"Argences", "Troarn", "Moult-Chicheboville", "Bavent", "Valambray", "Sannerville", "Bellengreville", "Frénouville", "Cagny", "Cuverville", "Démouville"}
EURE = {"Thiberville", "Épaignes", "Beuzeville", "Bernay", "Menneval", "Pont-Audemer", "Brionne", "Serquigny"}
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
    if d == 0:
        return "là où nous sommes basés"
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


# ---------------------------------------------------------------- services supplémentaires
NEWSVC = ("tonte-de-pelouse", "debroussaillage", "entretien-de-jardin")
SHORT.update({"tonte-de-pelouse": "Tonte", "debroussaillage": "Débroussaillage", "entretien-de-jardin": "Entretien de jardin"})
TITLE_NAME.update({"tonte-de-pelouse": "Tonte de pelouse", "debroussaillage": "Débroussaillage", "entretien-de-jardin": "Entretien de jardin"})
OVERLINE.update({"tonte-de-pelouse": "Tonte de pelouse", "debroussaillage": "Débroussaillage", "entretien-de-jardin": "Entretien de jardin"})
H1.update({
    "tonte-de-pelouse": ["Tonte de pelouse à {c} : un gazon dense, des bordures nettes", "Tonte à {c} : ponctuelle ou régulière", "Tondre sa pelouse à {c} : on s'en charge"],
    "debroussaillage": ["Débroussaillage à {c} : terrains, talus et friches", "Débroussaillage à {c} : on reprend votre terrain", "Débroussailler à {c} : ronces et broussailles"],
    "entretien-de-jardin": ["Entretien de jardin à {c} : toute l'année", "Entretien de jardin à {c} : un forfait à votre rythme", "Entretien de jardin à {c} : saison par saison"],
})
INTRO.update({
    "tonte-de-pelouse": [
        "{c} ({dir}, {kmp}) fait partie des communes où nous tondons les pelouses : petits jardins comme grands terrains, avec bordures finies et herbe ramassée ou mulchée. Appelez-nous pour une visite gratuite.",
        "Besoin d'une tonte à {c} ? Nous intervenons {kmp}, en passage ponctuel ou en tonte régulière, avec du matériel adapté à la surface. Un appel suffit pour obtenir un devis clair.",
        "À {c}, {pop} habitants, une pelouse bien tenue change l'allure d'une maison. Nous prenons la tonte en charge, de la reprise d'un gazon long à l'entretien suivi.",
    ],
    "debroussaillage": [
        "{c} ({dir}, {kmp}) est dans notre secteur d'intervention. Nous débroussaillons terrains, talus, bordures de chemin et friches : ronces, orties, broussailles, jeunes repousses. Visite et devis gratuits.",
        "Un terrain envahi à {c} ? Nous intervenons {kmp} pour le débroussailler, puis l'entretenir si vous le souhaitez, avec évacuation ou broyage des déchets verts.",
        "À {c}, {pop} habitants, beaucoup de terrains et de talus se referment vite. Nous les rouvrons avec le matériel adapté, en gardant ce qui mérite de l'être.",
    ],
    "entretien-de-jardin": [
        "{c} ({dir}, {kmp}) fait partie des communes où nous entretenons les jardins toute l'année : tonte, taille, désherbage, ramassage. Un forfait à votre rythme, après une visite gratuite.",
        "Vous cherchez qui peut entretenir votre jardin à {c} ? Nous intervenons {kmp}, avec un calendrier de passages adapté aux saisons et à la taille du terrain.",
        "À {c}, {pop} habitants, l'entretien d'un jardin se planifie : nous organisons les passages saison par saison pour que vous profitiez du jardin sans le subir.",
    ],
})
ARCH.update({
    "tonte-de-pelouse": {
        "coast": ["Près de la mer, le sol léger et le vent assèchent vite la pelouse en été. Nous relevons la hauteur de coupe dès les beaux jours et tondons plus souvent au printemps et à l'automne, quand l'herbe pousse.", "Les pelouses du littoral souffrent du sel et du sable : nous évitons la tonte rase, qui les affaiblit, et nous soignons les bordures le long des allées et des terrasses.", "Résidence secondaire sur la côte : nous tondons à la fréquence convenue pour que le jardin soit net à votre arrivée, y compris en votre absence."],
        "honfleur": ["Entre estuaire et plateau, l'herbe pousse fort et reste humide. Nous adaptons la fréquence de tonte à la météo et ramassons ou mulchons selon l'état du gazon.", "Les jardins du pays d'Honfleur mêlent pelouses de plein soleil et zones d'ombre sous les arbres : la hauteur de coupe n'est pas la même partout, et nous la modulons."],
        "plain": ["Dans la plaine, les pelouses sont souvent vastes et ouvertes. Nous travaillons avec des tondeuses adaptées aux grandes surfaces pour tenir un rythme régulier sans épuiser le gazon.", "Les terrains plats et dégagés se tondent vite, mais exigent de la régularité : un passage toutes les une à deux semaines en pleine pousse évite les reprises compliquées."],
        "eure": ["Nous tondons aussi dans ce secteur de l'Eure : petits jardins de bourg comme grandes pelouses de propriété, avec des passages planifiés.", "Qu'il s'agisse d'une tonte ponctuelle avant un événement ou d'un suivi régulier, nous nous adaptons à la surface et à l'accès."],
        "auge": ["Dans le Pays d'Auge, les pelouses entourent souvent des vergers et des haies : nous tondons autour des arbres, finissons les pieds de haie et ramassons ou mulchons selon la densité de l'herbe.", "Les grands jardins du bocage demandent du temps et du matériel : nous prenons la tonte en charge, du simple passage mensuel au suivi hebdomadaire en pleine pousse.", "Les prairies d'agrément et les talus se tondent autrement qu'un gazon : nous adaptons la machine et la hauteur de coupe au terrain."],
    },
    "debroussaillage": {
        "coast": ["Sur la côte, les friches se referment vite : ronces, prunelliers et orties profitent d'un sol léger. Nous les reprenons avant qu'elles ne gagnent les clôtures et les accès.", "Terrain de résidence secondaire laissé fermé plusieurs mois : nous le débroussaillons en un passage, puis proposons un entretien régulier."],
        "honfleur": ["Autour de l'estuaire, talus et fossés se couvrent de végétation dense. Nous les dégageons pour retrouver l'écoulement des eaux et l'accès aux parcelles.", "Terrains en pente, fonds de jardin, anciennes parcelles : le débroussaillage se prépare selon le relief et ce que l'on veut conserver."],
        "plain": ["Dans la plaine, les friches et les bordures de champs s'embroussaillent vite. Nous les reprenons avec le matériel adapté, y compris sur de grandes surfaces.", "Un terrain constructible, une parcelle à vendre ou un fond de propriété : nous le rendons propre et accessible."],
        "eure": ["Nous débroussaillons aussi les terrains de ce secteur de l'Eure : talus, bordures de chemins, anciens vergers, friches de fond de jardin.", "Visite sur place, devis, puis intervention à la date convenue : la méthode est la même de chaque côté de la limite départementale."],
        "auge": ["Dans le bocage augeron, les talus, fossés et vergers abandonnés se referment vite sous les ronces et les jeunes rejets. Nous les reprenons en gardant les arbres qui méritent de rester.", "Chemins creux, haies envahies, prairies enfrichées : nous intervenons avec des débroussailleuses professionnelles et nous évacuons ou broyons les déchets.", "Un terrain laissé plusieurs années demande souvent deux passages : un premier pour ouvrir, un second pour reprendre proprement. Nous vous le disons dès la visite."],
    },
    "entretien-de-jardin": {
        "coast": ["Entretenir un jardin près de la mer, c'est composer avec le vent et le sel : nous choisissons les périodes de taille et la hauteur de tonte en conséquence.", "Résidence secondaire ou maison principale : nous proposons un forfait de passages réguliers, y compris en votre absence, avec compte rendu si vous le souhaitez."],
        "honfleur": ["Le jardin d'une maison du pays d'Honfleur mêle pelouse, haies, massifs et fruitiers : nous planifions les travaux saison par saison, sans que rien ne soit oublié.", "Un entretien régulier évite les grosses remises en état : un passage toutes les deux ou trois semaines suffit souvent à tenir un jardin net."],
        "plain": ["Dans les lotissements et les maisons de plaine, le jardin se résume souvent à une grande pelouse, des haies et quelques massifs. Nous les entretenons à un rythme fixe.", "Jardin de week-end ou de tous les jours : nous adaptons la fréquence de passage à votre usage et à votre budget."],
        "eure": ["Nous entretenons aussi les jardins de ce secteur de l'Eure, de la maison de bourg à la propriété de campagne, avec des passages planifiés.", "Un seul interlocuteur pour la tonte, les haies et les massifs : c'est plus simple pour vous, et le jardin est cohérent d'un passage à l'autre."],
        "auge": ["Dans le Pays d'Auge, les jardins sont grands et variés : pelouses, haies champêtres, vergers, massifs. Nous établissons avec vous un calendrier annuel qui couvre tout.", "Au printemps, remise en ordre et premières tontes ; en été, tonte et taille légère ; à l'automne, ramassage des feuilles et taille de saison. Chaque passage est planifié.", "Une propriété de campagne se gère par saison. Nous nous occupons de l'entretien courant pour que vous profitiez du jardin au lieu de le subir."],
    },
})
GENERIC_B.update({
    "tonte-de-pelouse": [
        "La bonne fréquence dépend de la saison : en pleine pousse, au printemps et à l'automne, une tonte par semaine donne les meilleurs résultats ; en été sec, toutes les deux semaines suffisent souvent.",
        "Nous tondons à la bonne hauteur, jamais rase, pour garder un gazon dense qui résiste à la sécheresse. Les bordures sont finies au coupe-bordure et les allées soufflées.",
        "Mulching ou ramassage : le mulching nourrit la pelouse quand l'herbe est régulièrement coupée, le ramassage convient aux pelouses longues ou très denses. Nous choisissons avec vous.",
        "Pelouse laissée trop longtemps ? Nous la reprenons en plusieurs passages, pour ne pas la stresser, avant de passer à un rythme régulier.",
    ],
    "debroussaillage": [
        "Le débroussaillage se prépare : nous repérons ce qu'il faut garder (arbres, haies, jeunes chênes) et ce qui doit partir (ronces, orties, rejets envahissants) avant de commencer.",
        "Nous travaillons avec des débroussailleuses et des broyeurs professionnels, sur des terrains plats comme en pente, et nous évacuons ou broyons les déchets sur place.",
        "Un terrain débroussaillé puis entretenu régulièrement reste propre bien plus facilement : nous proposons un passage annuel ou semestriel après la remise en état.",
        "Obligation légale ou simple confort : nous intervenons pour les particuliers, les propriétaires de parcelles et les gestionnaires de biens, avec un devis ferme après visite.",
    ],
    "entretien-de-jardin": [
        "Un entretien régulier coûte moins cher qu'une grosse remise en état tous les deux ans : un jardin suivi reste net avec des passages courts et planifiés.",
        "Nous réalisons l'ensemble des travaux courants : tonte, taille de haies et d'arbustes, désherbage des massifs, ramassage des feuilles, nettoyage de fin de saison.",
        "Vous choisissez la formule : passage unique, forfait mensuel ou saisonnier. Le devis est établi après une visite gratuite, avec un prix ferme.",
        "Un seul interlocuteur pour tout le jardin, un seul appel pour décaler un passage ou ajouter un travail : nous gardons les choses simples.",
    ],
})
PRESTA.update({
    "tonte-de-pelouse": ["Tonte régulière ou ponctuelle", "Tonte de grandes surfaces", "Finition des bordures au coupe-bordure", "Ramassage ou mulching de l'herbe", "Tonte de reprise d'une pelouse longue", "Soufflage des allées et terrasses", "Tonte autour des arbres et des massifs", "Passages planifiés en votre absence", "Scarification et regarnissage en complément", "Évacuation des déchets verts"],
    "debroussaillage": ["Débroussaillage de terrains et parcelles", "Reprise de talus et de bordures de chemins", "Dégagement de friches et de ronciers", "Débroussaillage autour des arbres à conserver", "Broyage des déchets sur place", "Évacuation des déchets verts", "Remise en état avant vente ou construction", "Entretien annuel après remise en état", "Débroussaillage en pente", "Nettoyage des abords de clôtures"],
    "entretien-de-jardin": ["Tonte et finition des bordures", "Taille de haies et d'arbustes", "Désherbage des massifs et allées", "Ramassage des feuilles", "Nettoyage de fin de saison", "Taille de rosiers et de vivaces", "Entretien des résidences secondaires", "Remise en état d'un jardin négligé", "Planification saisonnière des passages", "Évacuation des déchets verts"],
})
NOUNS.update({"tonte-de-pelouse": ("une tonte de pelouse", "une tonte de pelouse"), "debroussaillage": ("un débroussaillage", "un débroussaillage"), "entretien-de-jardin": ("un entretien de jardin", "un entretien de jardin")})
FAQ_PRICE_A.update({
    "tonte-de-pelouse": ["Le prix dépend de la surface, du relief, des obstacles (arbres, massifs) et de la fréquence souhaitée. Nous passons voir le jardin à {c}, puis nous vous remettons un devis clair, avec un tarif de passage ou un forfait.", "Une tonte ponctuelle et un suivi régulier ne se chiffrent pas pareil. Après une visite gratuite, nous vous proposons la formule la plus avantageuse pour votre pelouse."],
    "debroussaillage": ["Le prix dépend de la surface, de la densité de la végétation, de la pente et de l'évacuation des déchets. Nous passons sur place à {c} sans frais, puis nous vous remettons un devis ferme.", "Un terrain peu envahi et un roncier de plusieurs années ne demandent pas le même temps de travail. Après visite, le devis détaille ce qui est prévu."],
    "entretien-de-jardin": ["Le prix dépend de la surface du jardin, des travaux prévus (tonte, haies, désherbage) et de la fréquence des passages. Nous passons à {c} pour une visite gratuite, puis nous vous proposons un forfait clair.", "Passage unique, forfait mensuel ou formule saisonnière : le devis est établi après visite, avec un prix ferme."],
})
FAQ_SPECIFIC.update({
    "tonte-de-pelouse": [
        ("À quelle fréquence faut-il tondre une pelouse ?", "En pleine pousse, au printemps et à l'automne, une tonte par semaine donne les meilleurs résultats. En été sec ou en hiver, elle peut être espacée. Nous adaptons les passages à la saison."),
        ("Faut-il ramasser l'herbe ou la laisser sur place ?", "Si la tonte est régulière, le mulching est très bien : l'herbe broyée nourrit la pelouse. Pour un gazon long ou très dense, le ramassage est préférable. Nous vous conseillons après avoir vu le jardin."),
        ("Pouvez-vous tondre une pelouse restée longtemps sans entretien ?", "Oui. Nous la reprenons progressivement, en plusieurs passages si besoin, pour ne pas stresser l'herbe, puis nous passons à un rythme régulier."),
    ],
    "debroussaillage": [
        ("Pouvez-vous débroussailler un terrain très envahi ?", "Oui. Après une visite, nous estimons le temps nécessaire, parfois en deux passages, et nous vous remettons un devis ferme. Les déchets sont évacués ou broyés sur place."),
        ("Gardez-vous les arbres et les haies existantes ?", "Oui, nous repérons avec vous ce qui doit être conservé avant de commencer : arbres, haies, jeunes chênes, fruitiers. Seule la végétation envahissante est retirée."),
        ("Que faire des déchets après le débroussaillage ?", "Ils peuvent être broyés sur place, laissés en andains si vous le souhaitez ou évacués. L'option est prévue au devis."),
    ],
    "entretien-de-jardin": [
        ("Proposez-vous un forfait d'entretien régulier ?", "Oui : passages hebdomadaires, bimensuels, mensuels ou saisonniers, selon la taille du jardin et votre budget. Nous fixons ensemble le rythme."),
        ("Entretenez-vous les résidences secondaires ?", "Oui, avec des passages à la fréquence convenue pour que le jardin soit net à votre arrivée, même quand vous êtes absent."),
        ("Quels travaux sont compris dans l'entretien ?", "Tonte, taille de haies et d'arbustes, désherbage, ramassage des feuilles, nettoyage de fin de saison. Le devis détaille ce qui est inclus, et on peut ajouter ou retirer des travaux."),
    ],
})
EXTRA_META = {
    "tonte-de-pelouse": lambda c, r: [f"Tonte de pelouse à {c} : ponctuelle ou régulière, bordures finies, herbe ramassée ou mulchée. Devis gratuit. Appelez le {PHONE}.", f"Tonte à {c} ({DL(r)}) : jardins et grands terrains, passages planifiés. Multi Taille Services : {PHONE}.", f"Une pelouse à tondre à {c} ? Visite et devis gratuits, bordures nettes, déchets évacués. Appel direct : {PHONE}."],
    "debroussaillage": lambda c, r: [f"Débroussaillage à {c} : terrains, talus, friches et ronces, déchets évacués ou broyés. Devis gratuit. Appelez le {PHONE}.", f"Débroussailler un terrain à {c} ({DL(r)}) : matériel professionnel, devis ferme après visite. Appel : {PHONE}.", f"Terrain envahi à {c} ? Débroussaillage, broyage et évacuation. Visite gratuite. Multi Taille Services : {PHONE}."],
    "entretien-de-jardin": lambda c, r: [f"Entretien de jardin à {c} : tonte, haies, désherbage, ramassage, au rythme qui vous convient. Devis gratuit. Appelez le {PHONE}.", f"Entretien de jardin à {c} ({DL(r)}) : forfait régulier ou passage unique, déchets évacués. Appel : {PHONE}.", f"Un jardinier pour entretenir votre jardin à {c} : visite et devis gratuits, passages planifiés. Appel direct : {PHONE}."],
}
EXTRA_H2 = {
    "tonte-de-pelouse": lambda c: [f"Votre pelouse à {c}", f"Tondre à {c} : ce qu'il faut savoir", f"Un gazon net à {c}"],
    "debroussaillage": lambda c: [f"Les terrains de {c}", f"Débroussailler à {c} : ce qu'il faut savoir", f"Un terrain propre à {c}"],
    "entretien-de-jardin": lambda c: [f"Les jardins de {c}", f"Entretenir un jardin à {c}", f"Un jardin suivi à {c}"],
}


def DL(r):
    return "Calvados" if r["d"] == 0 else f"{r['dir']} de Lisieux"


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
        for svc in ("elagage", "jardinier", "taille-de-haie") + NEWSVC:
            slug = f"{svc}-{slugify(c)}"
            kmp = km_phrase(r["d"])
            ctx = dict(c=c, dir=r["dir"], kmp=kmp, pop=pop_fmt(r["p"]))
            name = TITLE_NAME[svc]
            title = f"{name} à {c} | Multi Taille Services"
            if len(title) > 60:
                title = f"{name} à {c} | Multi Taille"
            if len(title) > 60:
                title = f"{name} à {c}"
            meta_opts = {} if svc in EXTRA_META else {
                "elagage": [
                    f"Élagueur à {c} ({DL(r)}) : taille douce, fruitiers, sécurisation, déchets évacués. Visite et devis gratuits. Appelez le {PHONE}.",
                    f"Élagage d'arbres à {c} : diagnostic gratuit, taille raisonnée, chantier propre. Multi Taille Services, basé à Lisieux. Appelez le {PHONE}.",
                    f"Besoin d'un élagueur à {c} ? Visite gratuite, devis ferme, taille soignée et évacuation des branches. Appel direct : {PHONE}.",
                ],
                "jardinier": [
                    f"Jardinier à {c} : tonte, taille de haies, désherbage, évacuation des déchets verts. Passage ponctuel ou régulier, devis gratuit. Appelez le {PHONE}.",
                    f"Entretien de jardin à {c} ({DL(r)}) : jardinier professionnel, visite et devis gratuits. Multi Taille Services : {PHONE}.",
                    f"Un jardinier à {c} pour tondre, tailler et désherber : devis gratuit après visite, déchets évacués. Appel direct : {PHONE}.",
                ],
                "taille-de-haie": [
                    f"Taille de haie à {c} : thuyas, lauriers, charmilles, haies champêtres. Visite et devis gratuits, déchets évacués. Appelez le {PHONE}.",
                    f"Taille de haies à {c} ({DL(r)}) : matériel adapté aux grandes hauteurs, chantier propre. Multi Taille Services : {PHONE}.",
                    f"Une haie à tailler à {c} ? Devis gratuit après visite, taille au cordeau et évacuation des déchets. Appel direct : {PHONE}.",
                ],
            }.get(svc, [])
            if svc in EXTRA_META:
                meta_opts = EXTRA_META[svc](c, r)
            meta = pick(c, svc + "m", meta_opts)
            if not 110 <= len(meta) <= 165:
                ok = [m for m in meta_opts if 110 <= len(m) <= 165]
                if ok:
                    meta = ok[0]
                else:
                    meta = meta.replace("Appelez le ", "Appel : ").replace("Appel direct : ", "Appel : ").replace(" de Lisieux)", ")")

            besoins_h2 = EXTRA_H2[svc](c) if svc in EXTRA_H2 else {
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
                "km": r["d"],
                "pop": r["p"],
                "city": c,
                "shortName": SHORT[svc],
                "title": title,
                "meta": meta,
                "h1": pick(c, svc + "h1", H1[svc]).format(c=c),
                "overline": (f"{OVERLINE[svc]} à {c}, notre ville de base" if r["d"] == 0 else f"{OVERLINE[svc]} à {c}, à {r['d']} km de Lisieux" if r["d"] > 3 else f"{OVERLINE[svc]} à {c}, aux portes de Lisieux"),
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
