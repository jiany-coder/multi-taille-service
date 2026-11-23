// 5 articles Entretien des espaces verts + 5 articles Conseils pratiques & réglementation.
export const RAW_ESPACES_VERTS = [
  {
    slug: "calendrier-entretien-espaces-verts-normandie",
    kw: "entretien espaces verts calendrier",
    intent: "Informationnelle — planification annuelle",
    title: "Entretien des espaces verts : calendrier de l'année",
    meta: "Calendrier d'entretien des espaces verts en Normandie : tonte, taille, débroussaillage, haies, arbres. Que faire à chaque saison dans le Pays d'Auge.",
    h1: "Entretien des espaces verts : le calendrier saison par saison en Normandie",
    excerpt: "Hiver, printemps, été, automne : les travaux à planifier pour un terrain bien tenu toute l'année.",
    intro: "Un terrain bien entretenu, c'est surtout une affaire de calendrier : intervenir au bon moment évite les gros chantiers. Voici les grands rendez-vous de l'année dans le climat normand.",
    sections: [
      {
        h2: "Hiver : la saison des arbres et des haies",
        paras: [
          "C'est le bon moment pour élaguer les arbres, tailler les haies caduques et champêtres, et traiter les fruitiers. Les végétaux sont au repos et le terrain, parfois détrempé, se prête moins aux machines : on privilégie les travaux manuels et la taille.",
        ],
      },
      {
        h2: "Printemps : reprise de la tonte et du débroussaillage",
        paras: [
          "Au printemps, l'herbe démarre : premières tontes, nettoyage des massifs, premier passage de débroussailleuse sur les bords. C'est aussi le moment de la première taille des haies de conifères, à la fin du printemps.",
        ],
      },
      {
        h2: "Été et automne",
        paras: [
          "L'été, tontes régulières, deuxième taille des haies persistantes, arrosage ciblé. À l'automne, dernière tonte, ramassage des feuilles, préparation de l'hiver. C'est aussi le moment de réserver les gros chantiers d'hiver.",
        ],
        list: [
          "Réservez élagage et abattage à l'automne : les plannings se remplissent.",
          "Contrôlez les arbres après les premières tempêtes.",
          "Programmez un contrat d'entretien régulier si vous manquez de temps.",
        ],
      },
    ],
    faq: [
      { q: "Proposez-vous un entretien régulier ?", a: "Oui, en passages réguliers ou ponctuels. Appelez-nous pour définir un rythme adapté à votre terrain." },
      { q: "Quand faut-il faire un premier passage ?", a: "Dès la sortie de l'hiver pour le terrain, et en automne pour planifier la taille des arbres et des haies." },
    ],
    related: ["frequence-entretien-haie", "tonte-pelouse-frequence-et-hauteur", "debroussaillage-terrain-normandie"],
    local: ["jardinier-lisieux"],
  },
  {
    slug: "debroussaillage-terrain-normandie",
    kw: "débroussaillage terrain",
    intent: "Transactionnelle — remise en état",
    title: "Débroussaillage d'un terrain en Normandie",
    meta: "Débroussaillage d'un terrain en friche : ronces, orties, broussailles, remise en état avant vente ou construction. Intervention autour de Lisieux.",
    h1: "Débroussailler un terrain en friche : quand, comment et pourquoi",
    excerpt: "Ronces, orties, jeunes arbres : comment remettre en état un terrain envahi, et pourquoi le faire avant qu'il ne soit trop tard.",
    intro: "Un terrain laissé sans entretien se couvre vite : ronces, orties, jeunes saules, arbustes. Le débroussailler devient alors un vrai chantier. Voici comment on l'aborde.",
    sections: [
      {
        h2: "Pourquoi débroussailler",
        paras: [
          "Pour retrouver l'usage d'un terrain (jardin, construction, vente), pour prévenir les nuisibles, ou parce que la végétation envahissante déborde chez le voisin. Un terrain trop envahi perd aussi de la valeur.",
        ],
      },
      {
        h2: "Comment on procède",
        paras: ["Selon la densité, plusieurs étapes se succèdent :"],
        list: [
          "Repérage du terrain : obstacles cachés, clôtures, arbres à garder.",
          "Passage de débroussailleuse ou de broyeur pour la végétation dense.",
          "Coupe des jeunes arbres et arbustes, éventuellement dessouchage.",
          "Évacuation ou broyage des déchets.",
        ],
      },
      {
        h2: "Après le débroussaillage",
        paras: [
          "Pour ne pas retrouver la friche l'année suivante, un entretien régulier est nécessaire : tonte, passage de débroussailleuse. Nous pouvons prolonger la remise en état par un entretien suivi.",
        ],
      },
    ],
    faq: [
      { q: "Peut-on brûler les broussailles coupées ?", a: "Le brûlage des déchets verts est en principe interdit pour les particuliers. Voir notre article dédié." },
      { q: "Intervenez-vous sur de grandes surfaces ?", a: "Oui, avec le matériel adapté. Visite et devis gratuits." },
    ],
    related: ["bruler-dechets-verts-interdit", "calendrier-entretien-espaces-verts-normandie", "tonte-pelouse-frequence-et-hauteur"],
    local: ["jardinier-lisieux"],
  },
  {
    slug: "tonte-pelouse-frequence-et-hauteur",
    kw: "tonte pelouse fréquence hauteur",
    intent: "Informationnelle — tonte",
    title: "Tonte de pelouse : fréquence et hauteur idéales",
    meta: "À quelle fréquence tondre sa pelouse et à quelle hauteur ? Les repères pour une pelouse dense en Normandie, du printemps à l'automne.",
    h1: "Tonte de pelouse : à quelle fréquence et à quelle hauteur ?",
    excerpt: "Trop courte, la pelouse jaunit ; trop rare, elle se salit. Les bons repères pour la tondre au climat normand.",
    intro: "Tondre n'est pas qu'une corvée : bien faite, la tonte densifie la pelouse. Mal faite, elle l'épuise. Voici les repères de fréquence et de hauteur adaptés à notre climat.",
    sections: [
      {
        h2: "Ne pas tondre trop court",
        paras: [
          "Une pelouse tondue trop ras s'affaiblit, jaunit en été et laisse la place aux mousses et aux mauvaises herbes. Gardez une hauteur modérée, un peu plus haute en été pour limiter le stress hydrique.",
        ],
      },
      {
        h2: "La règle du tiers",
        paras: [
          "On ne coupe jamais plus du tiers de la hauteur de l'herbe à chaque tonte. Cela permet à la pelouse de s'adapter. En pleine pousse, au printemps, cela revient à tondre une fois par semaine.",
        ],
      },
      {
        h2: "Fréquence selon la saison",
        paras: [
          "Au printemps, on tond souvent ; en été, moins quand l'herbe ralentit ; en automne, on finit à une hauteur un peu plus haute pour passer l'hiver. Si vous manquez de temps, nous assurons une tonte régulière avec évacuation.",
        ],
      },
    ],
    faq: [
      { q: "Faut-il ramasser l'herbe coupée ?", a: "Le mulching convient si l'herbe est courte et sèche ; sinon, ramasser évite le feutrage." },
      { q: "Peut-on tondre par temps humide ?", a: "À éviter : la coupe est mauvaise et le sol se tasse." },
    ],
    related: ["calendrier-entretien-espaces-verts-normandie", "debroussaillage-terrain-normandie", "entretien-espaces-verts-copropriete-et-professionnels"],
    local: ["jardinier-lisieux"],
  },
  {
    slug: "entretien-jardin-residence-secondaire-cote-fleurie",
    kw: "entretien jardin résidence secondaire Côte Fleurie",
    intent: "Locale / commerciale — résidences secondaires",
    title: "Entretien de jardin d'une résidence secondaire",
    meta: "Résidence secondaire sur la Côte Fleurie : entretien du jardin en votre absence, haies, arbres, tonte. Passages réguliers, compte rendu. Multi Taille Services.",
    h1: "Entretenir le jardin d'une résidence secondaire sur la Côte Fleurie",
    excerpt: "Quand vous n'êtes pas là, le jardin pousse quand même. Comment organiser un entretien fiable en votre absence.",
    intro: "Une résidence secondaire sur la Côte Fleurie, c'est un jardin vide une bonne partie de l'année. Pelouse haute, haie qui déborde, arbres non surveillés : l'entretien à distance demande une organisation adaptée.",
    sections: [
      {
        h2: "Un entretien calé sur vos séjours",
        paras: [
          "L'idéal est un jardin impeccable à votre arrivée : un passage juste avant vos séjours, plus un passage de contrôle l'hiver. On combine tonte, taille de haies, dégagement des allées et vérification des arbres.",
        ],
      },
      {
        h2: "La surveillance des arbres",
        paras: [
          "Après une tempête, personne n'est là pour constater les dégâts. Un passage de contrôle permet de repérer branches cassées et risques avant qu'ils ne causent des dommages. Nous pouvons le prévoir au contrat.",
        ],
      },
      {
        h2: "Comment on s'organise",
        paras: [
          "Nous convenons ensemble des modalités d'accès, des dates et du compte rendu après passage. Appelez-nous pour en parler ; la disponibilité à Deauville, Trouville, Cabourg est à confirmer selon votre adresse.",
        ],
      },
    ],
    faq: [
      { q: "Pouvez-vous intervenir sans que je sois là ?", a: "Oui, si l'accès est convenu à l'avance. Nous prévenons et rendons compte." },
      { q: "Proposez-vous un contrat à l'année ?", a: "Oui, selon vos besoins : passages saisonniers ou réguliers." },
    ],
    related: ["elagueur-deauville-trouville", "taille-de-haie-littoral-cabourg-deauville", "calendrier-entretien-espaces-verts-normandie"],
    local: ["jardinier-cabourg", "elagage-cabourg"],
    confirm: "Zone littorale à confirmer ; modalités de contrat à confirmer par le client.",
  },
  {
    slug: "entretien-espaces-verts-copropriete-et-professionnels",
    kw: "entretien espaces verts copropriété entreprise",
    intent: "Commerciale B2B",
    title: "Entretien d'espaces verts : copropriétés et pros",
    meta: "Entretien d'espaces verts pour copropriétés, gîtes, entreprises et collectivités autour de Lisieux : tonte, haies, arbres, passages réguliers. Devis gratuit.",
    h1: "Entretien d'espaces verts pour copropriétés, gîtes et professionnels",
    excerpt: "Tonte, haies, arbres, évacuation : un seul interlocuteur pour garder des extérieurs soignés toute l'année.",
    intro: "Copropriété, gîte, commerce, hôtel, entreprise : l'image des extérieurs compte. Un entretien régulier, fiable et facile à organiser évite les mauvaises surprises. Voici ce que nous proposons.",
    sections: [
      {
        h2: "Un seul interlocuteur",
        paras: [
          "Tonte, taille de haies, élagage, évacuation des déchets : tout peut être regroupé dans un même contrat. Vous n'avez qu'un seul numéro à appeler, et un seul passage à planifier.",
        ],
      },
      {
        h2: "Des passages planifiés",
        paras: [
          "Nous convenons ensemble d'un calendrier à l'année : fréquences de tonte, tailles de haies aux bonnes périodes, contrôle des arbres après les tempêtes. Les gestionnaires y gagnent en visibilité.",
        ],
      },
      {
        h2: "Sécurité des arbres",
        paras: [
          "Pour un gestionnaire, la responsabilité sur les arbres compte. Un contrôle régulier permet de repérer les sujets à risque et d'agir avant un accident. Appelez-nous pour un diagnostic gratuit de votre site et un devis écrit.",
        ],
      },
    ],
    faq: [
      { q: "Faites-vous des devis pour les syndics ?", a: "Oui, sur visite, avec devis écrit détaillé." },
      { q: "Travaillez-vous avec des collectivités ?", a: "Contactez-nous pour en discuter ; chaque situation est étudiée." },
    ],
    related: ["calendrier-entretien-espaces-verts-normandie", "tonte-pelouse-frequence-et-hauteur", "pourquoi-faire-appel-a-un-elagueur-professionnel"],
    local: ["jardinier-lisieux", "paysagiste-lisieux"],
    confirm: "Types de clients professionnels acceptés à confirmer avec le client.",
  },
];

export const RAW_REGLEMENTATION = [
  {
    slug: "distances-de-plantation-arbres-et-haies",
    kw: "distance plantation arbre haie limite voisin",
    intent: "Informationnelle — réglementation",
    title: "Distances de plantation : arbres et haies",
    meta: "Quelle distance respecter entre un arbre ou une haie et la limite du voisin ? Règle des 50 cm et des 2 mètres, hauteur, usages locaux. Les repères essentiels.",
    h1: "Distances de plantation : à quelle distance du voisin planter arbres et haies ?",
    excerpt: "Deux repères à connaître : 50 centimètres et 2 mètres. Et ce qui peut changer selon les usages locaux.",
    intro: "Planter un arbre ou une haie près de la limite de propriété déclenche vite des litiges. La loi fixe des distances minimales, avec des nuances. Voici les repères — à confirmer pour votre situation précise.",
    sections: [
      {
        h2: "Les deux distances de référence",
        paras: [
          "En règle générale, les plantations de plus de deux mètres de hauteur doivent être à au moins deux mètres de la limite séparative ; celles qui ne dépassent pas deux mètres, à au moins cinquante centimètres. La distance se mesure du milieu du tronc jusqu'à la limite.",
        ],
      },
      {
        h2: "Des exceptions et des usages locaux",
        paras: [
          "Des règlements ou usages locaux peuvent prévoir d'autres distances, et certaines situations (plantation le long d'un mur) obéissent à des règles particulières. En cas de doute, renseignez-vous en mairie ou auprès d'un conseil juridique.",
        ],
      },
      {
        h2: "Que faire si la plantation du voisin est trop proche ?",
        paras: [
          "Le voisin peut en principe demander la taille à la hauteur permise ou l'arrachage des plantations qui ne respectent pas les distances, sauf si elles existent depuis longtemps. Mieux vaut d'abord en parler à l'amiable. Nous ne sommes pas juristes : pour un litige, prenez conseil.",
        ],
      },
    ],
    faq: [
      { q: "Ma haie de thuyas est à 30 cm de la limite, est-ce un problème ?", a: "Si elle dépasse deux mètres de hauteur, la règle générale demande deux mètres de distance. Elle peut devoir être réduite ou déplacée, sous réserve de l'ancienneté et des usages locaux." },
      { q: "Peut-on réduire la hauteur d'une haie pour être en règle ?", a: "Oui, sur certaines essences. Nous pouvons évaluer si la réduction est possible sans abîmer la haie." },
    ],
    related: ["arbre-du-voisin-qui-depasse-chez-moi", "frequence-entretien-haie", "abattage-arbre-pres-d-une-maison"],
    local: ["taille-de-haie-lisieux"],
    confirm: "Informations juridiques générales : à faire relire / valider avant diffusion large.",
  },
  {
    slug: "arbre-du-voisin-qui-depasse-chez-moi",
    kw: "arbre du voisin branches racines que dit la loi",
    intent: "Informationnelle — conflit de voisinage",
    title: "Arbre du voisin qui dépasse : que dit la loi ?",
    meta: "Branches du voisin chez vous, racines, fruits tombés : vos droits et obligations. Qui coupe quoi, et comment éviter le conflit. Repères pratiques.",
    h1: "Arbre du voisin qui dépasse chez vous : branches, racines, fruits",
    excerpt: "Vous pouvez demander l'élagage des branches, mais pas les couper vous-même. Les racines, c'est autre chose.",
    intro: "Une branche qui déborde, des racines qui soulèvent une dalle, des fruits qui tombent : l'arbre du voisin est un classique des conflits. Voici les repères, avant d'agir.",
    sections: [
      {
        h2: "Les branches : on demande, on ne coupe pas",
        paras: [
          "Les branches qui avancent sur votre terrain sont à couper par le propriétaire de l'arbre si vous le lui demandez. Vous ne pouvez pas les couper vous-même sans son accord. C'est un droit, qui ne se perd pas avec le temps.",
        ],
      },
      {
        h2: "Les racines : un régime différent",
        paras: [
          "À l'inverse, si des racines ou des ronces s'avancent chez vous, vous pouvez en principe les couper vous-même à la limite de votre propriété. Attention toutefois à ne pas condamner l'arbre : une coupe trop sévère pourrait engager votre responsabilité.",
        ],
      },
      {
        h2: "Fruits et feuilles",
        paras: [
          "Les fruits tombés naturellement sur votre terrain peuvent être ramassés. Mais vous ne pouvez pas cueillir ceux qui restent sur les branches. Pour les feuilles, il n'y a en principe pas de recours.",
        ],
      },
      {
        h2: "L'amiable d'abord",
        paras: [
          "La première étape reste la discussion, puis un courrier recommandé si nécessaire. Un élagueur peut intervenir avec l'accord du propriétaire. Ces repères sont généraux : pour un litige, prenez conseil.",
        ],
      },
    ],
    faq: [
      { q: "Le voisin refuse d'élaguer, que faire ?", a: "Envoyez un courrier recommandé, puis, si nécessaire, rapprochez-vous de la mairie ou d'un conciliateur de justice." },
      { q: "Puis-je faire élaguer à mes frais ?", a: "Seulement avec l'accord du voisin. Nous pouvons intervenir si les deux voisins sont d'accord." },
    ],
    related: ["distances-de-plantation-arbres-et-haies", "elagage-arbre-dangereux", "frequence-entretien-haie"],
    local: ["elagage-lisieux"],
    confirm: "Informations juridiques générales : à faire relire / valider avant diffusion large.",
  },
  {
    slug: "abattre-un-arbre-autorisation-et-arbre-protege",
    kw: "abattre un arbre autorisation arbre protégé",
    intent: "Informationnelle — réglementation",
    title: "Abattre un arbre : autorisation et arbres protégés",
    meta: "Faut-il une autorisation pour abattre un arbre ? Arbre protégé, espace boisé classé, haie bocagère, secteur patrimonial : les cas à vérifier avant d'abattre.",
    h1: "Abattre un arbre : faut-il une autorisation ? Les cas d'arbres protégés",
    excerpt: "Sur un terrain privé, on peut souvent abattre sans démarche — mais plusieurs cas exigent une autorisation. À vérifier avant de couper.",
    intro: "Abattre un arbre dans son jardin semble libre. En pratique, plusieurs situations imposent une déclaration ou une autorisation, et le non-respect peut coûter cher. Voici les points à vérifier avant d'engager le moindre chantier.",
    sections: [
      {
        h2: "Le cas général",
        paras: [
          "Sur un terrain privé ordinaire, il n'existe pas d'autorisation générale pour abattre un arbre. Mais ce principe a des exceptions, qui dépendent du lieu et des documents d'urbanisme.",
        ],
      },
      {
        h2: "Les cas à vérifier",
        paras: ["Avant d'abattre, vérifiez en mairie si vous êtes dans l'un de ces cas :"],
        list: [
          "Espace boisé classé (EBC) dans le plan local d'urbanisme : déclaration préalable.",
          "Haie ou arbre repéré au plan local d'urbanisme pour sa valeur paysagère ou écologique.",
          "Abords d'un monument historique, site patrimonial remarquable ou site classé.",
          "Lotissement : règlement ou cahier des charges qui peut encadrer les plantations.",
          "Arbre remarquable ou espèce protégée.",
        ],
      },
      {
        h2: "Comment faire",
        paras: [
          "Renseignez-vous auprès du service urbanisme de votre mairie, avec l'adresse et la parcelle. Nous pouvons vous aider à poser les bonnes questions, mais c'est à vous de faire les démarches. Pour tout abattage, nous passons d'abord voir l'arbre et vous disons ce qu'il faut vérifier. Ces repères sont généraux : confirmez auprès de votre mairie.",
        ],
      },
    ],
    faq: [
      { q: "Quelle sanction en cas d'abattage non autorisé ?", a: "Des sanctions peuvent s'appliquer, selon le cas. D'où l'intérêt de vérifier avant d'agir." },
      { q: "Puis-je abattre un arbre mort sans démarche ?", a: "Même un arbre mort peut être concerné dans certains secteurs protégés. Vérifiez en mairie." },
    ],
    related: ["quand-abattre-un-arbre", "elagage-ou-abattage-que-choisir", "abattage-arbre-dangereux"],
    local: ["elagage-lisieux"],
    confirm: "Informations réglementaires générales : à faire valider avant diffusion large.",
  },
  {
    slug: "nidification-et-taille-des-haies",
    kw: "taille haie nidification période interdite",
    intent: "Informationnelle — réglementation",
    title: "Taille de haie : la période de nidification",
    meta: "Peut-on tailler une haie au printemps ? Nidification, oiseaux protégés, règles pour les agriculteurs, bonnes pratiques pour les particuliers. Repères pratiques.",
    h1: "Taille de haie et nidification : quelle période respecter ?",
    excerpt: "Printemps et début d'été : les oiseaux nichent dans les haies. Ce qu'impose la loi et ce que recommande le bon sens.",
    intro: "De la fin de l'hiver au début de l'été, les haies abritent de nombreuses nichées. Les tailler à ce moment peut détruire des nids d'oiseaux protégés. Voici ce que vous devez savoir.",
    sections: [
      {
        h2: "Ce que dit la loi",
        paras: [
          "La destruction des nids et des oiseaux protégés est interdite. Pour les exploitants agricoles, une période d'interdiction de taille des haies s'applique, au printemps et en début d'été, au titre des règles de conditionnalité agricole. Les dates précises sont à vérifier auprès de la chambre d'agriculture.",
        ],
      },
      {
        h2: "Et pour les particuliers ?",
        paras: [
          "Il n'existe pas toujours de calendrier unique pour les jardins privés, mais l'interdiction de détruire les nids s'applique à tous. Le bon sens est de limiter les grosses tailles au printemps et en été, et de contrôler la haie avant toute coupe.",
        ],
      },
      {
        h2: "Nos recommandations",
        paras: [
          "Privilégier la taille d'hiver pour les haies champêtres. Pour les haies de jardin taillées, une taille légère à la fin du printemps est possible après vérification de l'absence de nids. Si un nid est présent, on attend la fin de la nichée.",
        ],
      },
    ],
    faq: [
      { q: "J'ai trouvé un nid dans ma haie, que faire ?", a: "Laissez la haie telle quelle jusqu'à la fin de la nichée. Revenez à la taille après." },
      { q: "Quelles dates exactes pour les agriculteurs ?", a: "À vérifier auprès de la chambre d'agriculture ou de la direction départementale, car les règles évoluent." },
    ],
    related: ["tailler-une-haie-champetre-bocage", "quand-tailler-sa-haie-en-normandie", "entretien-haies-avant-l-hiver"],
    local: ["taille-de-haie-lisieux"],
    confirm: "Dates précises de la période d'interdiction agricole à vérifier avant diffusion.",
  },
  {
    slug: "bruler-dechets-verts-interdit",
    kw: "brûler déchets verts interdit",
    intent: "Informationnelle — réglementation",
    title: "Brûler ses déchets verts : interdit",
    meta: "Brûler les déchets verts du jardin est en principe interdit. Alternatives : déchèterie, broyage, compostage, évacuation par un professionnel. Repères pratiques.",
    h1: "Brûler ses déchets verts : pourquoi c'est interdit et que faire à la place",
    excerpt: "Branches de taille, feuilles, tontes : le brûlage à l'air libre est en principe interdit. Les solutions concrètes.",
    intro: "Après une taille de haie ou un élagage, le tas de branches pose question. Le brûler semble pratique, mais c'est en principe interdit pour les particuliers. Voici pourquoi, et quelles alternatives.",
    sections: [
      {
        h2: "Pourquoi c'est interdit",
        paras: [
          "Le brûlage à l'air libre des déchets verts émet des particules et des polluants nocifs pour la santé. Il est en principe interdit aux particuliers, avec des dérogations possibles selon les départements et les situations. Renseignez-vous en mairie ou en préfecture.",
        ],
      },
      {
        h2: "Les alternatives",
        paras: ["Plusieurs solutions existent :"],
        list: [
          "La déchèterie, pour les volumes courants.",
          "Le broyage sur place, pour produire du paillage.",
          "Le compostage des tontes et petits déchets.",
          "L'évacuation par un professionnel lors du chantier.",
        ],
      },
      {
        h2: "Chez nous",
        paras: [
          "Lors d'un chantier d'élagage ou de taille de haie, nous proposons le broyage sur place ou l'évacuation complète des déchets, chiffrés clairement au devis. Un appel suffit pour en parler.",
        ],
      },
    ],
    faq: [
      { q: "Quelle amende encourt-on ?", a: "Une amende peut être prévue. Renseignez-vous auprès de la mairie ou de la préfecture." },
      { q: "Les agriculteurs peuvent-ils brûler ?", a: "Les règles sont différentes pour les professionnels. Voir la réglementation locale." },
    ],
    related: ["debroussaillage-terrain-normandie", "prix-taille-de-haie", "prix-elagage-arbre"],
    local: ["elagage-lisieux", "taille-de-haie-lisieux"],
    confirm: "Règles préfectorales locales à vérifier avant diffusion.",
  },
];
