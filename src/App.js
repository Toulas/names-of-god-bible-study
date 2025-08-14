import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Bookmark, Volume2, StickyNote, Moon, Sun, Search, ArrowUp, X, Download, Upload, Trash2, Shuffle, Printer } from 'lucide-react';

// Bible Verses (KJV)
const bibleVerses = {
  'Genesis 1:1': 'In the beginning God created the heaven and the earth.',
  'Genesis 2:4': 'These are the generations of the heavens and of the earth when they were created, in the day that the LORD God made the earth and the heavens.',
  'Genesis 14:18': 'And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God.',
  'Genesis 14:18-20': 'And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God. And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth: And blessed be the most high God, which hath delivered thine enemies into thy hand.',
  'Genesis 15:1': 'After these things the word of the LORD came unto Abram in a vision, saying, Fear not, Abram: I am thy shield, and thy exceeding great reward.',
  'Genesis 15:2': 'And Abram said, Lord GOD, what wilt thou give me, seeing I go childless, and the steward of my house is this Eliezer of Damascus?',
  'Genesis 16:13': 'And she called the name of the LORD that spake unto her, Thou God seest me: for she said, Have I also here looked after him that seeth me?',
  'Genesis 17:1': 'And when Abram was ninety years old and nine, the LORD appeared to Abram, and said unto him, I am the Almighty God; walk before me, and be thou perfect.',
  'Genesis 18:25': 'That be far from thee to do after this manner, to slay the righteous with the wicked: and that the righteous should be as the wicked, that be far from thee: Shall not the Judge of all the earth do right?',
  'Genesis 21:33': 'And Abraham planted a grove in Beersheba, and called there on the name of the LORD, the everlasting God.',
  'Genesis 22:14': 'And Abraham called the name of that place Jehovahjireh: as it is said to this day, In the mount of the LORD it shall be seen.',
  'Genesis 28:3': 'And God Almighty bless thee, and make thee fruitful, and multiply thee, that thou mayest be a multitude of people.',
  'Genesis 49:9': 'Judah is a lion\'s whelp: from the prey, my son, thou art gone up: he stooped down, he couched as a lion, and as an old lion; who shall rouse him up?',
  'Exodus 3:14': 'And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you.',
  'Exodus 6:3': 'And I appeared unto Abraham, unto Isaac, and unto Jacob, by the name of God Almighty, but by my name JEHOVAH was I not known to them.',
  'Exodus 15:26': 'And said, If thou wilt diligently hearken to the voice of the LORD thy God, and wilt do that which is right in his sight, and wilt give ear to his commandments, and keep all his statutes, I will put none of these diseases upon thee, which I have brought upon the Egyptians: for I am the LORD that healeth thee.',
  'Exodus 17:15': 'And Moses built an altar, and called the name of it Jehovahnissi.',
  'Exodus 20:5': 'Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me.',
  'Exodus 31:13': 'Speak thou also unto the children of Israel, saying, Verily my sabbaths ye shall keep: for it is a sign between me and you throughout your generations; that ye may know that I am the LORD that doth sanctify you.',
  'Exodus 34:14': 'For thou shalt worship no other god: for the LORD, whose name is Jealous, is a jealous God.',
  'Leviticus 20:8': 'And ye shall keep my statutes, and do them: I am the LORD which sanctify you.',
  'Deuteronomy 4:24': 'For the LORD thy God is a consuming fire, even a jealous God.',
  'Deuteronomy 10:17': 'For the LORD your God is God of gods, and Lord of lords, a great God, a mighty, and a terrible, which regardeth not persons, nor taketh reward.',
  'Deuteronomy 32:4': 'He is the Rock, his work is perfect: for all his ways are judgment: a God of truth and without iniquity, just and right is he.',
  'Judges 6:24': 'Then Gideon built an altar there unto the LORD, and called it Jehovahshalom: unto this day it is yet in Ophrah of the Abiezrites.',
  '1 Samuel 1:3': 'And this man went up out of his city yearly to worship and to sacrifice unto the LORD of hosts in Shiloh.',
  '2 Samuel 22:2': 'And he said, The LORD is my rock, and my fortress, and my deliverer.',
  'Nehemiah 9:32': 'Now therefore, our God, the great, the mighty, and the terrible God, who keepest covenant and mercy, let not all the trouble seem little before thee.',
  'Job 19:25': 'For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth.',
  'Psalm 3:3': 'But thou, O LORD, art a shield for me; my glory, and the lifter up of mine head.',
  'Psalm 18:2': 'The LORD is my rock, and my fortress, and my deliverer; my God, my strength, in whom I will trust; my buckler, and the horn of my salvation, and my high tower.',
  'Psalm 19:1': 'The heavens declare the glory of God; and the firmament sheweth his handywork.',
  'Psalm 23:1': 'The LORD is my shepherd; I shall not want.',
  'Psalm 27:1': 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?',
  'Psalm 28:7': 'The LORD is my strength and my shield; my heart trusted in him, and I am helped: therefore my heart greatly rejoiceth; and with my song will I praise him.',
  'Psalm 60:4': 'Thou hast given a banner to them that fear thee, that it may be displayed because of the truth.',
  'Psalm 78:35': 'And they remembered that God was their rock, and the high God their redeemer.',
  'Psalm 83:18': 'That men may know that thou, whose name alone is JEHOVAH, art the most high over all the earth.',
  'Psalm 84:12': 'O LORD of hosts, blessed is the man that trusteth in thee.',
  'Psalm 90:2': 'Before the mountains were brought forth, or ever thou hadst formed the earth and the world, even from everlasting to everlasting, thou art God.',
  'Psalm 91:1': 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.',
  'Psalm 91:2': 'I will say of the LORD, He is my refuge and my fortress: my God; in him will I trust.',
  'Psalm 96:13': 'Before the LORD: for he cometh, for he cometh to judge the earth: he shall judge the world with righteousness, and the people with his truth.',
  'Psalm 103:3': 'Who forgiveth all thine iniquities; who healeth all thy diseases.',
  'Psalm 110:1': 'The LORD said unto my Lord, Sit thou at my right hand, until I make thine enemies thy footstool.',
  'Psalm 118:22': 'The stone which the builders refused is become the head stone of the corner.',
  'Psalm 139:1-4': 'O LORD, thou hast searched me, and known me. Thou knowest my downsitting and mine uprising, thou understandest my thought afar off. Thou compassest my path and my lying down, and art acquainted with all my ways. For there is not a word in my tongue, but, lo, O LORD, thou knowest it altogether.',
  'Proverbs 15:3': 'The eyes of the LORD are in every place, beholding the evil and the good.',
  'Proverbs 18:10': 'The name of the LORD is a strong tower: the righteous runneth into it, and is safe.',
  'Isaiah 6:1': 'In the year that king Uzziah died I saw also the Lord sitting upon a throne, high and lifted up, and his train filled the temple.',
  'Isaiah 6:3': 'And one cried unto another, and said, Holy, holy, holy, is the LORD of hosts: the whole earth is full of his glory.',
  'Isaiah 7:14': 'Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.',
  'Isaiah 9:6': 'For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.',
  'Isaiah 11:10': 'And in that day there shall be a root of Jesse, which shall stand for an ensign of the people; to it shall the Gentiles seek: and his rest shall be glorious.',
  'Isaiah 40:11': 'He shall feed his flock like a shepherd: he shall gather the lambs with his arm, and carry them in his bosom, and shall gently lead those that are with young.',
  'Isaiah 40:28': 'Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding.',
  'Isaiah 53:5': 'But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.',
  'Jeremiah 8:22': 'Is there no balm in Gilead; is there no physician there? why then is not the health of the daughter of my people recovered?',
  'Jeremiah 23:6': 'In his days Judah shall be saved, and Israel shall dwell safely: and this is his name whereby he shall be called, THE LORD OUR RIGHTEOUSNESS.',
  'Jeremiah 33:16': 'In those days shall Judah be saved, and Jerusalem shall dwell safely: and this is the name wherewith she shall be called, The LORD our righteousness.',
  'Ezekiel 48:35': 'It was round about eighteen thousand measures: and the name of the city from that day shall be, The LORD is there.',
  'Daniel 4:34': 'And at the end of the days I Nebuchadnezzar lifted up mine eyes unto heaven, and mine understanding returned unto me, and I blessed the most High, and I praised and honoured him that liveth for ever, whose dominion is an everlasting dominion, and his kingdom is from generation to generation.',
  'Daniel 7:13': 'I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven, and came to the Ancient of days, and they brought him near before him.',
  'Hosea 11:10': 'They shall walk after the LORD: he shall roar like a lion: when he shall roar, then the children shall tremble from the west.',
  'Matthew 1:16': 'And Jacob begat Joseph the husband of Mary, of whom was born Jesus, who is called Christ.',
  'Matthew 1:20': 'But while he thought on these things, behold, the angel of the Lord appeared unto him in a dream, saying, Joseph, thou son of David, fear not to take unto thee Mary thy wife: for that which is conceived in her is of the Holy Ghost.',
  'Matthew 1:21': 'And she shall bring forth a son, and thou shalt call his name JESUS: for he shall save his people from their sins.',
  'Matthew 1:23': 'Behold, a virgin shall be with child, and shall bring forth a son, and they shall call his name Emmanuel, which being interpreted is, God with us.',
  'Matthew 3:17': 'And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.',
  'Matthew 4:4': 'But he answered and said, It is written, Man shall not live by bread alone, but by every word that proceedeth out of the mouth of God.',
  'Matthew 5:14': 'Ye are the light of the world. A city that is set on an hill cannot be hid.',
  'Matthew 6:26': 'Behold the fowls of the air: for they sow not, neither do they reap, nor gather into barns; yet your heavenly Father feedeth them. Are ye not much better than they?',
  'Matthew 7:24': 'Therefore whosoever heareth these sayings of mine, and doeth them, I will liken him unto a wise man, which built his house upon a rock.',
  'Matthew 8:20': 'And Jesus saith unto him, The foxes have holes, and the birds of the air have nests; but the Son of man hath not where to lay his head.',
  'Matthew 9:12': 'But when Jesus heard that, he said unto them, They that be whole need not a physician, but they that are sick.',
  'Matthew 9:15': 'And Jesus said unto them, Can the children of the bridechamber mourn, as long as the bridegroom is with them? but the days will come, when the bridegroom shall be taken from them, and then shall they fast.',
  'Matthew 16:16': 'And Simon Peter answered and said, Thou art the Christ, the Son of the living God.',
  'Matthew 28:20': 'Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.',
  'Mark 14:36': 'And he said, Abba, Father, all things are possible unto thee; take away this cup from me: nevertheless not what I will, but what thou wilt.',
  'Mark 14:62': 'And Jesus said, I am: and ye shall see the Son of man sitting on the right hand of power, and coming in the clouds of heaven.',
  'Luke 2:11': 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord.',
  'Luke 4:23': 'And he said unto them, Ye will surely say unto me this proverb, Physician, heal thyself: whatsoever we have heard done in Capernaum, do also here in thy country.',
  'John 1:1': 'In the beginning was the Word, and the Word was with God, and the Word was God.',
  'John 1:4-5': 'In him was life; and the life was the light of men. And the light shineth in darkness; and the darkness comprehended it not.',
  'John 1:14': 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.',
  'John 1:29': 'The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world.',
  'John 1:41': 'He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ.',
  'John 3:16': 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.',
  'John 3:29': 'He that hath the bride is the bridegroom: but the friend of the bridegroom, which standeth and heareth him, rejoiceth greatly because of the bridegroom\'s voice: this my joy therefore is fulfilled.',
  'John 6:35': 'And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger; and he that believeth on me shall never thirst.',
  'John 6:48': 'I am that bread of life.',
  'John 8:12': 'Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness, but shall have the light of life.',
  'John 9:5': 'As long as I am in the world, I am the light of the world.',
  'John 10:11': 'I am the good shepherd: the good shepherd giveth his life for the sheep.',
  'John 11:25': 'Jesus said unto her, I am the resurrection, and the life: he that believeth in me, though he were dead, yet shall he live.',
  'John 14:6': 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.',
  'John 14:16': 'And I will pray the Father, and he shall give you another Comforter, that he may abide with you for ever.',
  'John 15:1': 'I am the true vine, and my Father is the husbandman.',
  'John 15:5': 'I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.',
  'Acts 2:36': 'Therefore let all the house of Israel know assuredly, that God hath made that same Jesus, whom ye have crucified, both Lord and Christ.',
  'Acts 4:12': 'Neither is there salvation in any other: for there is none other name under heaven given among men, whereby we must be saved.',
  'Romans 1:4': 'And declared to be the Son of God with power, according to the spirit of holiness, by the resurrection from the dead.',
  'Romans 1:16': 'For I am not ashamed of the gospel of Christ: for it is the power of God unto salvation to every one that believeth; to the Jew first, and also to the Greek.',
  'Romans 6:9': 'Knowing that Christ being raised from the dead dieth no more; death hath no more dominion over him.',
  'Romans 8:15': 'For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father.',
  'Romans 8:26': 'Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.',
  'Romans 10:9': 'That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.',
  '1 Corinthians 10:4': 'And did all drink the same spiritual drink: for they drank of that spiritual Rock that followed them: and that Rock was Christ.',
  '1 Corinthians 12:3': 'Wherefore I give you to understand, that no man speaking by the Spirit of God calleth Jesus accursed: and that no man can say that Jesus is the Lord, but by the Holy Ghost.',
  '1 Corinthians 15:20': 'But now is Christ risen from the dead, and become the firstfruits of them that slept.',
  '2 Corinthians 5:21': 'For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him.',
  'Galatians 3:13': 'Christ hath redeemed us from the curse of the law, being made a curse for us: for it is written, Cursed is every one that hangeth on a tree.',
  'Galatians 4:6': 'And because ye are sons, God hath sent forth the Spirit of his Son into your hearts, crying, Abba, Father.',
  'Galatians 5:22-23': 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.',
  'Ephesians 2:20': 'And are built upon the foundation of the apostles and prophets, Jesus Christ himself being the chief corner stone.',
  'Ephesians 6:16': 'Above all, taking the shield of faith, wherewith ye shall be able to quench all the fiery darts of the wicked.',
  'Philippians 2:10': 'That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth.',
  'Philippians 2:11': 'And that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father.',
  'Philippians 4:7': 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
  'Philippians 4:19': 'But my God shall supply all your need according to his riches in glory by Christ Jesus.',
  '1 Thessalonians 5:23': 'And the very God of peace sanctify you wholly; and I pray God your whole spirit and soul and body be preserved blameless unto the coming of our Lord Jesus Christ.',
  '1 Timothy 2:5': 'For there is one God, and one mediator between God and men, the man Christ Jesus.',
  '1 Timothy 6:15': 'Which in his times he shall shew, who is the blessed and only Potentate, the King of kings, and Lord of lords.',
  '2 Timothy 4:8': 'Henceforth there is laid up for me a crown of righteousness, which the Lord, the righteous judge, shall give me at that day: and not to me only, but unto all them also that love his appearing.',
  'Titus 2:13': 'Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.',
  'Titus 2:14': 'Who gave himself for us, that he might redeem us from all iniquity, and purify unto himself a peculiar people, zealous of good works.',
  'Hebrews 10:20': 'By a new and living way, which he hath consecrated for us, through the veil, that is to say, his flesh.',
  '1 Peter 1:19': 'But with the precious blood of Christ, as of a lamb without blemish and without spot.',
  '1 Peter 2:6': 'Wherefore also it is contained in the scripture, Behold, I lay in Sion a chief corner stone, elect, precious: and he that believeth on him shall not be confounded.',
  '1 Peter 5:4': 'And when the chief Shepherd shall appear, ye shall receive a crown of glory that fadeth not away.',
  '2 Peter 1:1': 'Simon Peter, a servant and an apostle of Jesus Christ, to them that have obtained like precious faith with us through the righteousness of God and our Saviour Jesus Christ.',
  '1 John 1:5': 'This then is the message which we have heard of him, and declare unto you, that God is light, and in him is no darkness at all.',
  '1 John 2:1': 'My little children, these things write I unto you, that ye sin not. And if any man sin, we have an advocate with the Father, Jesus Christ the righteous.',
  'Revelation 1:8': 'I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.',
  'Revelation 5:5': 'And one of the elders saith unto me, Weep not: behold, the Lion of the tribe of Juda, the Root of David, hath prevailed to open the book, and to loose the seven seals thereof.',
  'Revelation 5:12': 'Saying with a loud voice, Worthy is the Lamb that was slain to receive power, and riches, and wisdom, and strength, and honour, and glory, and blessing.',
  'Revelation 17:14': 'These shall make war with the Lamb, and the Lamb shall overcome them: for he is Lord of lords, and King of kings: and they that are with him are called, and chosen, and faithful.',
  'Revelation 19:7': 'Let us be glad and rejoice, and give honour to him: for the marriage of the Lamb is come, and his wife hath made herself ready.',
  'Revelation 19:13': 'And he was clothed with a vesture dipped in blood: and his name is called The Word of God.',
  'Revelation 19:16': 'And he hath on his vesture and on his thigh a name written, KING OF KINGS, AND LORD OF LORDS.',
  'Revelation 21:3': 'And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.',
  'Revelation 21:6': 'And he said unto me, It is done. I am Alpha and Omega, the beginning and the end. I will give unto him that is athirst of the fountain of the water of life freely.',
  'Revelation 22:13': 'I am Alpha and Omega, the beginning and the end, the first and the last.'
};

// Complete Names Database - 48 Names Total
const namesDatabase = {
  hebrew: [
    {
      id: 'elohim',
      name: 'Elohim',
      translation: 'God, Mighty Creator',
      hebrew: 'אֱלֹהִים',
      pronunciation: 'El-oh-heem',
      meaning: 'The plural form of El, emphasising God\'s power and might as Creator',
      firstMention: 'Genesis 1:1',
      keyVerses: ['Genesis 1:1', 'Psalm 19:1', 'Isaiah 40:28'],
      significance: 'Reveals God as the all-powerful Creator who spoke the universe into existence',
      context: 'Used over 2,500 times in the Old Testament, often emphasising God\'s creative power and sovereignty',
      application: 'Trust in God\'s creative power to bring order from chaos in your life',
      prayer: 'Elohim, Mighty Creator, I worship You as the One who spoke all things into being. Help me trust in Your creative power in my life.',
      reflectionQuestions: [
        'How does knowing God as Creator affect your view of the world?',
        'What areas of your life need God\'s creative touch?',
        'How can you honour God as Elohim in your daily decisions?'
      ]
    },
    {
      id: 'yahweh',
      name: 'Yahweh',
      translation: 'I AM, The Self-Existent One',
      hebrew: 'יהוה',
      pronunciation: 'Yah-way',
      meaning: 'The personal name of God, meaning "I AM WHO I AM" - the eternal, self-existent One',
      firstMention: 'Genesis 2:4',
      keyVerses: ['Exodus 3:14', 'Exodus 6:3', 'Psalm 83:18'],
      significance: 'God\'s covenant name, revealing His eternal nature and faithfulness',
      context: 'The most sacred name of God, used about 6,800 times in the Hebrew Bible',
      application: 'Rest in the unchanging nature of God who is the same yesterday, today, and forever',
      prayer: 'Yahweh, eternal I AM, thank You for being constant and faithful. Help me trust in Your unchanging nature.',
      reflectionQuestions: [
        'What does it mean that God is self-existent?',
        'How does God\'s eternal nature bring comfort in changing times?',
        'In what ways has God shown His faithfulness to you?'
      ]
    },
    {
      id: 'adonai',
      name: 'Adonai',
      translation: 'Lord, Master',
      hebrew: 'אֲדֹנָי',
      pronunciation: 'Ah-doh-nigh',
      meaning: 'Lord, Master, Owner - emphasising God\'s authority and our submission',
      firstMention: 'Genesis 15:2',
      keyVerses: ['Genesis 15:2', 'Psalm 110:1', 'Isaiah 6:1'],
      significance: 'Acknowledges God\'s lordship and our position as His servants',
      context: 'Often used in place of YHWH when reading Scripture aloud',
      application: 'Submit to God\'s authority in every area of your life',
      prayer: 'Adonai, my Lord and Master, I submit to Your authority. Guide me as Your servant today.',
      reflectionQuestions: [
        'What areas of your life need to be surrendered to God\'s lordship?',
        'How does recognising God as Master change your daily choices?',
        'What does it mean to serve Adonai wholeheartedly?'
      ]
    },
    {
      id: 'el-shaddai',
      name: 'El Shaddai',
      translation: 'God Almighty, All-Sufficient One',
      hebrew: 'אֵל שַׁדַּי',
      pronunciation: 'El Sha-dye',
      meaning: 'The All-Sufficient One, the God who is more than enough',
      firstMention: 'Genesis 17:1',
      keyVerses: ['Genesis 17:1', 'Genesis 28:3', 'Psalm 91:1'],
      significance: 'Reveals God\'s ability to provide abundantly and protect completely',
      context: 'Often appears in contexts of blessing and covenant promises',
      application: 'Trust God to be sufficient for every need in your life',
      prayer: 'El Shaddai, All-Sufficient One, You are more than enough for me. I trust in Your abundant provision.',
      reflectionQuestions: [
        'How has God shown Himself to be sufficient in your life?',
        'What needs are you trusting El Shaddai to meet?',
        'How does knowing God as All-Sufficient affect your worries?'
      ]
    },
    {
      id: 'el-elyon',
      name: 'El Elyon',
      translation: 'God Most High',
      hebrew: 'אֵל עֶלְיוֹן',
      pronunciation: 'El El-yohn',
      meaning: 'The Most High God, sovereign over all',
      firstMention: 'Genesis 14:18',
      keyVerses: ['Genesis 14:18-20', 'Psalm 78:35', 'Daniel 4:34'],
      significance: 'Emphasises God\'s supreme position above all other powers',
      context: 'Often used to distinguish the true God from false gods',
      application: 'Recognise God\'s sovereignty over every situation in your life',
      prayer: 'El Elyon, Most High God, You reign supreme over all. Help me trust in Your sovereign control.',
      reflectionQuestions: [
        'How does God\'s position as Most High comfort you?',
        'What competing "gods" need to be dethroned in your life?',
        'How can you honour El Elyon\'s supremacy today?'
      ]
    },
    {
      id: 'el-roi',
      name: 'El Roi',
      translation: 'The God Who Sees',
      hebrew: 'אֵל רֳאִי',
      pronunciation: 'El Roy-ee',
      meaning: 'The God who sees me, who is aware of my situation',
      firstMention: 'Genesis 16:13',
      keyVerses: ['Genesis 16:13', 'Psalm 139:1-4', 'Proverbs 15:3'],
      significance: 'God sees and cares about our circumstances',
      context: 'Revealed to Hagar in her distress in the wilderness',
      application: 'Take comfort that God sees your situation and cares',
      prayer: 'El Roi, God who sees me, thank You for being aware of my circumstances. Help me trust that You see and care.',
      reflectionQuestions: [
        'How does it comfort you to know God sees everything?',
        'What situation do you need El Roi to see today?',
        'How should knowing God sees affect your behaviour?'
      ]
    },
    {
      id: 'el-olam',
      name: 'El Olam',
      translation: 'The Everlasting God',
      hebrew: 'אֵל עוֹלָם',
      pronunciation: 'El Oh-lahm',
      meaning: 'The Eternal God, existing from everlasting to everlasting',
      firstMention: 'Genesis 21:33',
      keyVerses: ['Genesis 21:33', 'Isaiah 40:28', 'Psalm 90:2'],
      significance: 'God transcends time and is eternally present',
      context: 'Abraham called upon this name after making a covenant',
      application: 'Trust in God\'s eternal perspective on your temporary problems',
      prayer: 'El Olam, Everlasting God, You are from eternity to eternity. Help me see life from Your eternal perspective.',
      reflectionQuestions: [
        'How does God\'s eternal nature affect your view of time?',
        'What temporary concerns need an eternal perspective?',
        'How can you invest in eternal rather than temporal things?'
      ]
    },
    {
      id: 'yahweh-jireh',
      name: 'Yahweh-Jireh',
      translation: 'The Lord Will Provide',
      hebrew: 'יהוה יִרְאֶה',
      pronunciation: 'Yah-way Jyrah',
      meaning: 'The LORD will see to it, The LORD will provide',
      firstMention: 'Genesis 22:14',
      keyVerses: ['Genesis 22:14', 'Philippians 4:19', 'Matthew 6:26'],
      significance: 'God sees our needs ahead of time and provides',
      context: 'Named by Abraham when God provided a ram in place of Isaac',
      application: 'Trust God to provide for your needs, even when you can\'t see how',
      prayer: 'Yahweh-Jireh, my Provider, I trust You to see and meet my needs according to Your riches.',
      reflectionQuestions: [
        'How has God provided for you in unexpected ways?',
        'What needs are you trusting Yahweh-Jireh to meet?',
        'How can you testify of God\'s provision to others?'
      ]
    },
    {
      id: 'yahweh-rapha',
      name: 'Yahweh-Rapha',
      translation: 'The Lord Who Heals',
      hebrew: 'יהוה רֹפֵא',
      pronunciation: 'Yah-way Rahfah',
      meaning: 'The LORD who heals you, your divine Physician',
      firstMention: 'Exodus 15:26',
      keyVerses: ['Exodus 15:26', 'Psalm 103:3', 'Isaiah 53:5'],
      significance: 'God is the source of all healing - physical, emotional, and spiritual',
      context: 'Revealed after God healed the bitter waters of Marah',
      application: 'Bring your brokenness to the Great Physician for healing',
      prayer: 'Yahweh-Rapha, Divine Healer, I bring my brokenness to You. Heal me in body, soul, and spirit.',
      reflectionQuestions: [
        'What areas of your life need God\'s healing touch?',
        'How has God brought healing to you in the past?',
        'Who can you pray for to experience Yahweh-Rapha\'s healing?'
      ]
    },
    {
      id: 'yahweh-nissi',
      name: 'Yahweh-Nissi',
      translation: 'The Lord My Banner',
      hebrew: 'יהוה נִסִּי',
      pronunciation: 'Yah-way Neesee',
      meaning: 'The LORD is my banner, my victory flag',
      firstMention: 'Exodus 17:15',
      keyVerses: ['Exodus 17:15', 'Psalm 60:4', 'Isaiah 11:10'],
      significance: 'God is our rallying point and source of victory',
      context: 'Moses built an altar after victory over the Amalekites',
      application: 'Rally under God\'s banner in spiritual battles',
      prayer: 'Yahweh-Nissi, my Banner, I rally under Your standard. Lead me to victory in every battle.',
      reflectionQuestions: [
        'What battles are you facing that need God\'s victory?',
        'How can you rally others under God\'s banner?',
        'What victories has Yahweh-Nissi given you?'
      ]
    },
    {
      id: 'yahweh-shalom',
      name: 'Yahweh-Shalom',
      translation: 'The Lord Is Peace',
      hebrew: 'יהוה שָׁלוֹם',
      pronunciation: 'Yah-way Shahlohme',
      meaning: 'The LORD is peace, the source of wholeness and completeness',
      firstMention: 'Judges 6:24',
      keyVerses: ['Judges 6:24', 'Isaiah 9:6', 'Philippians 4:7'],
      significance: 'God brings perfect peace and wholeness to our lives',
      context: 'Gideon named an altar this after encountering the Angel of the LORD',
      application: 'Experience God\'s peace in the midst of life\'s storms',
      prayer: 'Yahweh-Shalom, Prince of Peace, fill me with Your perfect peace that surpasses understanding.',
      reflectionQuestions: [
        'Where do you need God\'s peace in your life?',
        'How can you be a peacemaker in God\'s name?',
        'What robs you of peace that needs to be surrendered?'
      ]
    },
    {
      id: 'yahweh-raah',
      name: 'Yahweh-Ra\'ah',
      translation: 'The Lord My Shepherd',
      hebrew: 'יהוה רֹעִי',
      pronunciation: 'Yah-way Rah-ah',
      meaning: 'The LORD is my shepherd who cares for and guides me',
      firstMention: 'Psalm 23:1',
      keyVerses: ['Psalm 23:1', 'John 10:11', 'Isaiah 40:11'],
      significance: 'God tenderly cares for us as a shepherd cares for sheep',
      context: 'David\'s declaration based on his experience as a shepherd',
      application: 'Follow the Good Shepherd\'s voice and guidance',
      prayer: 'Yahweh-Ra\'ah, my Shepherd, lead me beside still waters and restore my soul.',
      reflectionQuestions: [
        'How has God shepherded you through difficult times?',
        'Are you listening to the Shepherd\'s voice?',
        'Where do you need the Shepherd\'s guidance today?'
      ]
    },
    {
      id: 'yahweh-tsidkenu',
      name: 'Yahweh-Tsidkenu',
      translation: 'The Lord Our Righteousness',
      hebrew: 'יהוה צִדְקֵנוּ',
      pronunciation: 'Yah-way Sid-kay-nu',
      meaning: 'The LORD is our righteousness, our moral perfection',
      firstMention: 'Jeremiah 23:6',
      keyVerses: ['Jeremiah 23:6', 'Jeremiah 33:16', '2 Corinthians 5:21'],
      significance: 'God provides the righteousness we cannot achieve ourselves',
      context: 'A Messianic prophecy about the coming righteous King',
      application: 'Rest in God\'s righteousness rather than your own efforts',
      prayer: 'Yahweh-Tsidkenu, my Righteousness, thank You for clothing me in Your perfect righteousness.',
      reflectionQuestions: [
        'How does God\'s righteousness free you from perfectionism?',
        'What areas of self-righteousness need to be surrendered?',
        'How can you live out God\'s righteousness today?'
      ]
    },
    {
      id: 'yahweh-shammah',
      name: 'Yahweh-Shammah',
      translation: 'The Lord Is There',
      hebrew: 'יהוה שָׁמָּה',
      pronunciation: 'Yah-way Shammah',
      meaning: 'The LORD is there, present with His people',
      firstMention: 'Ezekiel 48:35',
      keyVerses: ['Ezekiel 48:35', 'Matthew 28:20', 'Revelation 21:3'],
      significance: 'God\'s presence is with His people always',
      context: 'The name of the future Jerusalem in Ezekiel\'s vision',
      application: 'Practise awareness of God\'s constant presence',
      prayer: 'Yahweh-Shammah, ever-present God, help me be aware of Your presence in every moment.',
      reflectionQuestions: [
        'How can you cultivate awareness of God\'s presence?',
        'When have you most felt God\'s presence?',
        'How does God\'s presence change your perspective?'
      ]
    },
    {
      id: 'yahweh-mkaddesh',
      name: 'Yahweh-M\'kaddesh',
      translation: 'The Lord Who Sanctifies',
      hebrew: 'יהוה מְקַדֵּשׁ',
      pronunciation: 'Yah-way Mehkah-desh',
      meaning: 'The LORD who sanctifies, sets apart, and makes holy',
      firstMention: 'Exodus 31:13',
      keyVerses: ['Exodus 31:13', 'Leviticus 20:8', '1 Thessalonians 5:23'],
      significance: 'God sets us apart for His purposes and makes us holy',
      context: 'Connected with Sabbath observance and covenant relationship',
      application: 'Allow God to set you apart for His purposes',
      prayer: 'Yahweh-M\'kaddesh, Sanctifier, set me apart for Your holy purposes and make me more like You.',
      reflectionQuestions: [
        'How is God sanctifying you currently?',
        'What needs to be set apart for God in your life?',
        'How can you live as one sanctified by God?'
      ]
    },
    {
      id: 'el-gibbor',
      name: 'El Gibbor',
      translation: 'Mighty God',
      hebrew: 'אֵל גִּבּוֹר',
      pronunciation: 'El Ghibbore',
      meaning: 'Mighty God, divine warrior, hero',
      firstMention: 'Isaiah 9:6',
      keyVerses: ['Isaiah 9:6', 'Deuteronomy 10:17', 'Nehemiah 9:32'],
      significance: 'God is a mighty warrior who fights for His people',
      context: 'A Messianic title prophesying Christ\'s divine nature',
      application: 'Trust the Mighty God to fight your battles',
      prayer: 'El Gibbor, Mighty God, fight my battles and show Your strength in my weakness.',
      reflectionQuestions: [
        'What battles do you need El Gibbor to fight?',
        'How has God shown His might in your life?',
        'How can you rely on God\'s strength instead of your own?'
      ]
    },
    {
      id: 'el-qanna',
      name: 'El Qanna',
      translation: 'Jealous God',
      hebrew: 'אֵל קַנָּא',
      pronunciation: 'El Kan-nah',
      meaning: 'Jealous God, passionate for relationship',
      firstMention: 'Exodus 20:5',
      keyVerses: ['Exodus 20:5', 'Exodus 34:14', 'Deuteronomy 4:24'],
      significance: 'God desires exclusive devotion and relationship',
      context: 'Revealed in the context of the Ten Commandments',
      application: 'Give God the exclusive devotion He deserves',
      prayer: 'El Qanna, Jealous God, purify my heart to worship You alone with undivided devotion.',
      reflectionQuestions: [
        'What competes for God\'s place in your heart?',
        'How does God\'s jealousy reflect His love?',
        'What idols need to be removed from your life?'
      ]
    },
    {
      id: 'yahweh-sabaoth',
      name: 'Yahweh-Sabaoth',
      translation: 'The Lord of Hosts',
      hebrew: 'יהוה צְבָאוֹת',
      pronunciation: 'Yah-way Sa-bah-oat',
      meaning: 'The LORD of armies, commander of heaven\'s forces',
      firstMention: '1 Samuel 1:3',
      keyVerses: ['1 Samuel 1:3', 'Psalm 84:12', 'Isaiah 6:3'],
      significance: 'God commands all the armies of heaven',
      context: 'Often used in contexts of spiritual warfare and divine power',
      application: 'Trust in God\'s unlimited resources and power',
      prayer: 'Yahweh-Sabaoth, Lord of Hosts, deploy Your heavenly armies on my behalf.',
      reflectionQuestions: [
        'How does knowing God commands heaven\'s armies encourage you?',
        'What spiritual battles require heaven\'s intervention?',
        'How can you partner with God\'s heavenly forces?'
      ]
    }
  ],
  greek: [
    {
      id: 'theos',
      name: 'Theos',
      translation: 'God',
      greek: 'Θεός',
      pronunciation: 'Thay-oss',
      meaning: 'God, deity, the supreme divine being',
      firstMention: 'Matthew 1:23',
      keyVerses: ['John 1:1', 'Romans 1:16', '1 Timothy 2:5'],
      significance: 'The New Testament equivalent of Elohim',
      context: 'Used over 1,300 times in the New Testament',
      application: 'Worship God as the supreme being worthy of all honour',
      prayer: 'Theos, Almighty God, I worship You as the one true God above all.',
      reflectionQuestions: [
        'How does the New Testament reveal God\'s nature?',
        'What does it mean that Jesus is called Theos?',
        'How can you honour God as supreme in your life?'
      ]
    },
    {
      id: 'kurios',
      name: 'Kurios',
      translation: 'Lord, Master',
      greek: 'Κύριος',
      pronunciation: 'Koo-ree-oss',
      meaning: 'Lord, master, one with authority',
      firstMention: 'Matthew 1:20',
      keyVerses: ['Philippians 2:11', 'Romans 10:9', '1 Corinthians 12:3'],
      significance: 'Acknowledges Jesus\' lordship and divine authority',
      context: 'Used for both God the Father and Jesus Christ',
      application: 'Submit to Jesus as Lord of every area of life',
      prayer: 'Kurios, Lord Jesus, I confess You as Lord and submit to Your authority.',
      reflectionQuestions: [
        'What areas need to come under Christ\'s lordship?',
        'How does confessing Jesus as Lord change your life?',
        'What does lordship mean practically?'
      ]
    },
    {
      id: 'abba',
      name: 'Abba',
      translation: 'Father',
      greek: 'Ἀββᾶ',
      pronunciation: 'Ah-bah',
      meaning: 'Father, daddy, intimate term for father',
      firstMention: 'Mark 14:36',
      keyVerses: ['Mark 14:36', 'Romans 8:15', 'Galatians 4:6'],
      significance: 'Reveals our intimate relationship with God as Father',
      context: 'Jesus used this intimate term in prayer',
      application: 'Approach God with childlike trust and intimacy',
      prayer: 'Abba, Father, thank You for the privilege of calling You daddy.',
      reflectionQuestions: [
        'How does seeing God as Abba change your prayer life?',
        'What prevents intimacy with God as Father?',
        'How can you cultivate childlike trust?'
      ]
    },
    {
      id: 'jesus',
      name: 'Jesus (Yeshua)',
      translation: 'Saviour',
      greek: 'Ἰησοῦς',
      hebrew: 'יֵשׁוּעַ',
      pronunciation: 'Yeh-shoo-ah',
      meaning: 'Yahweh saves, Yahweh is salvation',
      firstMention: 'Matthew 1:21',
      keyVerses: ['Matthew 1:21', 'Acts 4:12', 'Philippians 2:10'],
      significance: 'The personal name of our Saviour',
      context: 'The Greek form of the Hebrew name Yeshua (Joshua)',
      application: 'Call upon the name of Jesus for salvation',
      prayer: 'Jesus, precious Saviour, thank You for living up to Your name by saving me.',
      reflectionQuestions: [
        'What does the name Jesus mean to you personally?',
        'How has Jesus saved you?',
        'How can you honour the name of Jesus today?'
      ]
    },
    {
      id: 'emmanuel',
      name: 'Emmanuel (Immanuel)',
      translation: 'God with Us',
      greek: 'Ἐμμανουήλ',
      hebrew: 'עִמָּנוּאֵל',
      pronunciation: 'Eman-you-el',
      meaning: 'God with us, God\'s presence amongst His people',
      firstMention: 'Matthew 1:23',
      keyVerses: ['Matthew 1:23', 'Isaiah 7:14', 'John 1:14'],
      significance: 'God came to dwell amongst us in Jesus Christ',
      context: 'Fulfilment of Isaiah\'s prophecy',
      application: 'Experience God\'s presence through Christ',
      prayer: 'Emmanuel, God with us, thank You for coming near and dwelling amongst us.',
      reflectionQuestions: [
        'How does God\'s presence with you bring comfort?',
        'What difference does Emmanuel make in loneliness?',
        'How can you share God\'s presence with others?'
      ]
    },
    {
      id: 'christos',
      name: 'Christ (Christos)',
      translation: 'The Anointed One',
      greek: 'Χριστός',
      pronunciation: 'Kriss-toss',
      meaning: 'The Anointed One, Messiah',
      firstMention: 'Matthew 1:16',
      keyVerses: ['Matthew 16:16', 'John 1:41', 'Acts 2:36'],
      significance: 'Jesus is the promised Messiah, anointed by God',
      context: 'Greek equivalent of Hebrew "Messiah"',
      application: 'Recognise Jesus as God\'s chosen Messiah',
      prayer: 'Christ Jesus, Anointed One, I acknowledge You as God\'s chosen Messiah.',
      reflectionQuestions: [
        'What does it mean that Jesus is the Christ?',
        'How does Jesus fulfil Messianic prophecies?',
        'How should knowing Jesus as Christ affect your life?'
      ]
    },
    {
      id: 'son-of-god',
      name: 'Son of God (Huios tou Theou)',
      translation: 'Divine Sonship',
      greek: 'Υἱὸς τοῦ Θεοῦ',
      pronunciation: 'huwee-oss too Thayoo',
      meaning: 'The unique Son of God, sharing divine nature',
      firstMention: 'Matthew 3:17',
      keyVerses: ['Matthew 3:17', 'John 3:16', 'Romans 1:4'],
      significance: 'Jesus\' unique relationship with the Father',
      context: 'Affirms Jesus\' deity and divine nature',
      application: 'Worship Jesus as the divine Son of God',
      prayer: 'Son of God, I worship You as divine, one with the Father.',
      reflectionQuestions: [
        'What does Jesus\' sonship reveal about God?',
        'How does the Son of God give you access to the Father?',
        'What privileges come from being God\'s child?'
      ]
    },
    {
      id: 'son-of-man',
      name: 'Son of Man (Huios tou Anthropou)',
      translation: 'Humanity and Messianic Role',
      greek: 'Υἱὸς τοῦ ἀνθρώπου',
      pronunciation: 'huwee-oss too An-thro-poo',
      meaning: 'Jesus\' humanity and Messianic identity',
      firstMention: 'Matthew 8:20',
      keyVerses: ['Daniel 7:13', 'Matthew 8:20', 'Mark 14:62'],
      significance: 'Jesus fully human yet divine Messiah',
      context: 'Jesus\' favourite self-designation',
      application: 'Relate to Jesus who understands human experience',
      prayer: 'Son of Man, thank You for becoming human to save humanity.',
      reflectionQuestions: [
        'How does Jesus\' humanity encourage you?',
        'What does the Son of Man title mean prophetically?',
        'How can Jesus sympathise with your struggles?'
      ]
    },
    {
      id: 'lamb-of-god',
      name: 'Lamb of God (Amnos tou Theou)',
      translation: 'The Sacrifice for Sin',
      greek: 'Ἀμνὸς τοῦ Θεοῦ',
      pronunciation: 'Am-nos too Thay-oo',
      meaning: 'The perfect sacrifice who takes away sin',
      firstMention: 'John 1:29',
      keyVerses: ['John 1:29', '1 Peter 1:19', 'Revelation 5:12'],
      significance: 'Jesus as the perfect Passover lamb',
      context: 'Fulfils the Old Testament sacrificial system',
      application: 'Trust in Christ\'s perfect sacrifice for your sins',
      prayer: 'Lamb of God, thank You for taking away my sins through Your sacrifice.',
      reflectionQuestions: [
        'How does the Lamb imagery reveal God\'s plan?',
        'What does Christ\'s sacrifice mean to you?',
        'How can you honour the Lamb\'s sacrifice?'
      ]
    },
    {
      id: 'alpha-omega',
      name: 'Alpha and Omega',
      translation: 'Beginning and End',
      greek: 'Ἄλφα καὶ Ὦ',
      pronunciation: 'Al-fah and Oh-may-gah',
      meaning: 'The first and last, eternal and complete',
      firstMention: 'Revelation 1:8',
      keyVerses: ['Revelation 1:8', 'Revelation 21:6', 'Revelation 22:13'],
      significance: 'Christ\'s eternal nature and sovereignty',
      context: 'Using first and last letters of Greek alphabet',
      application: 'Trust Christ with your beginning and end',
      prayer: 'Alpha and Omega, You are my beginning and end, my all in all.',
      reflectionQuestions: [
        'How does Christ\'s eternal nature comfort you?',
        'What does it mean that Jesus is complete?',
        'How can you trust Him with your whole life?'
      ]
    },
    {
      id: 'king-of-kings',
      name: 'King of Kings (Basileus Basileōn)',
      translation: 'Supreme Ruler',
      greek: 'Βασιλεὺς τῶν βασιλέων',
      pronunciation: 'Basileus Basileōn',
      meaning: 'Supreme ruler over all earthly kings',
      firstMention: '1 Timothy 6:15',
      keyVerses: ['1 Timothy 6:15', 'Revelation 17:14', 'Revelation 19:16'],
      significance: 'Christ\'s ultimate authority over all rulers',
      context: 'Title of supreme sovereignty',
      application: 'Submit to Christ\'s ultimate authority',
      prayer: 'King of Kings, I bow before Your supreme authority and majesty.',
      reflectionQuestions: [
        'How does Christ\'s kingship affect your allegiance?',
        'What areas need to submit to the King\'s rule?',
        'How can you honour Christ as King today?'
      ]
    },
    {
      id: 'light-of-world',
      name: 'Light of the World (Phos tou Kosmou)',
      translation: 'Spiritual Illumination',
      greek: 'Φῶς τοῦ κόσμου',
      pronunciation: 'Fos too Kos-moo',
      meaning: 'The source of spiritual light and truth',
      firstMention: 'John 8:12',
      keyVerses: ['John 8:12', 'John 9:5', 'Matthew 5:14'],
      significance: 'Jesus illuminates spiritual darkness',
      context: 'Spoken during the Feast of Tabernacles',
      application: 'Walk in Christ\'s light and reflect it to others',
      prayer: 'Light of the World, shine in my darkness and guide my path.',
      reflectionQuestions: [
        'Where do you need Christ\'s light to shine?',
        'How can you reflect His light to others?',
        'What darkness needs to be exposed to His light?'
      ]
    },
    {
      id: 'logos',
      name: 'The Word (Logos)',
      translation: 'Divine Expression',
      greek: 'Λόγος',
      pronunciation: 'Loh-goss',
      meaning: 'The Word, divine reason, God\'s expression',
      firstMention: 'John 1:1',
      keyVerses: ['John 1:1', 'John 1:14', 'Revelation 19:13'],
      significance: 'Jesus as God\'s perfect communication to humanity',
      context: 'Philosophical term showing Jesus as divine reason',
      application: 'Listen to God\'s Word made flesh',
      prayer: 'Living Word, speak to my heart and transform my mind.',
      reflectionQuestions: [
        'How does Jesus perfectly reveal God?',
        'What is God saying to you through His Word?',
        'How can you better hear God\'s voice?'
      ]
    },
    {
      id: 'saviour',
      name: 'Saviour (Soter)',
      translation: 'The One Who Saves',
      greek: 'Σωτήρ',
      pronunciation: 'Soh-tehr',
      meaning: 'Saviour, deliverer, preserver',
      firstMention: 'Luke 2:11',
      keyVerses: ['Luke 2:11', 'Titus 2:13', '2 Peter 1:1'],
      significance: 'Jesus saves from sin, death, and judgement',
      context: 'Announced by angels at Christ\'s birth',
      application: 'Trust Jesus as your personal Saviour',
      prayer: 'Saviour, thank You for rescuing me from sin and death.',
      reflectionQuestions: [
        'What has Jesus saved you from?',
        'How can you share the Saviour with others?',
        'What areas still need His saving power?'
      ]
    },
    {
      id: 'redeemer',
      name: 'Redeemer (Lytrotis)',
      translation: 'The One Who Rescues',
      greek: 'Λυτρωτής',
      pronunciation: 'Lee-tro-tees',
      meaning: 'One who pays the ransom price to free slaves',
      firstMention: 'Job 19:25',
      keyVerses: ['Job 19:25', 'Galatians 3:13', 'Titus 2:14'],
      significance: 'Christ paid the price to redeem us from sin',
      context: 'Marketplace term for buying freedom',
      application: 'Live as one redeemed, not enslaved',
      prayer: 'Redeemer, thank You for paying the price for my freedom.',
      reflectionQuestions: [
        'What has Christ redeemed you from?',
        'How can you live in the freedom He purchased?',
        'Who needs to hear about the Redeemer?'
      ]
    }
  ],
  descriptive: [
    {
      id: 'good-shepherd',
      name: 'The Good Shepherd',
      translation: 'Caregiver and Guide',
      greek: 'Ὁ ποιμὴν ὁ καλός',
      meaning: 'The shepherd who lays down his life for the sheep',
      firstMention: 'John 10:11',
      keyVerses: ['John 10:11', 'Psalm 23:1', '1 Peter 5:4'],
      significance: 'Jesus cares for and protects His flock',
      context: 'Contrasted with hired hands who abandon sheep',
      application: 'Follow the Shepherd\'s voice and guidance',
      prayer: 'Good Shepherd, lead me in paths of righteousness and protect me from harm.',
      reflectionQuestions: [
        'How has the Good Shepherd cared for you?',
        'Are you listening to His voice?',
        'How can you care for others as He cares for you?'
      ]
    },
    {
      id: 'bread-of-life',
      name: 'The Bread of Life',
      translation: 'Spiritual Nourishment',
      greek: 'Ὁ ἄρτος τῆς ζωῆς',
      meaning: 'The source of spiritual sustenance and eternal life',
      firstMention: 'John 6:35',
      keyVerses: ['John 6:35', 'John 6:48', 'Matthew 4:4'],
      significance: 'Jesus satisfies our deepest spiritual hunger',
      context: 'Spoken after feeding the 5,000',
      application: 'Feed on Christ daily for spiritual strength',
      prayer: 'Bread of Life, satisfy my spiritual hunger and fill me with Your presence.',
      reflectionQuestions: [
        'How do you "feed" on Christ daily?',
        'What spiritual hunger does He satisfy?',
        'How can you share this bread with others?'
      ]
    },
    {
      id: 'true-vine',
      name: 'The True Vine',
      translation: 'Source of Life and Growth',
      greek: 'Ἡ ἄμπελος ἡ ἀληθινή',
      meaning: 'The source of spiritual life and fruitfulness',
      firstMention: 'John 15:1',
      keyVerses: ['John 15:1', 'John 15:5', 'Galatians 5:22-23'],
      significance: 'Apart from Christ we can do nothing',
      context: 'Jesus\' final teaching before crucifixion',
      application: 'Remain connected to Christ to bear fruit',
      prayer: 'True Vine, help me abide in You and bear fruit that glorifies the Father.',
      reflectionQuestions: [
        'How closely are you connected to the Vine?',
        'What fruit is evident in your life?',
        'What needs pruning for greater fruitfulness?'
      ]
    },
    {
      id: 'rock',
      name: 'The Rock',
      translation: 'Stability and Protection',
      hebrew: 'צוּר',
      meaning: 'Unchanging foundation and shelter',
      firstMention: 'Deuteronomy 32:4',
      keyVerses: ['Psalm 18:2', '1 Corinthians 10:4', 'Matthew 7:24'],
      significance: 'God is our stable foundation in unstable times',
      context: 'Common metaphor in ancient Near East',
      application: 'Build your life on the solid Rock',
      prayer: 'Rock of Ages, be my firm foundation and unshakeable refuge.',
      reflectionQuestions: [
        'What storms has the Rock protected you from?',
        'Is your life built on the Rock or sand?',
        'How can you shelter others in the Rock?'
      ]
    },
    {
      id: 'fortress',
      name: 'The Fortress',
      translation: 'Refuge and Defence',
      hebrew: 'מְצוּדָה',
      meaning: 'Strong tower, place of defence and safety',
      firstMention: '2 Samuel 22:2',
      keyVerses: ['Psalm 18:2', 'Psalm 91:2', 'Proverbs 18:10'],
      significance: 'God is our protection against spiritual enemies',
      context: 'Military imagery of ancient fortified cities',
      application: 'Run to God as your fortress in times of trouble',
      prayer: 'Mighty Fortress, be my defence against all enemies and fears.',
      reflectionQuestions: [
        'What battles require God\'s fortress protection?',
        'How has God been your fortress?',
        'Are you hiding in God\'s fortress or fighting alone?'
      ]
    },
    {
      id: 'shield',
      name: 'The Shield',
      translation: 'Defender',
      hebrew: 'מָגֵן',
      meaning: 'Protector who deflects attacks',
      firstMention: 'Genesis 15:1',
      keyVerses: ['Psalm 3:3', 'Psalm 28:7', 'Ephesians 6:16'],
      significance: 'God actively defends His people',
      context: 'Personal protection in battle',
      application: 'Trust God to shield you from harm',
      prayer: 'Lord, my Shield, protect me from the fiery darts of the enemy.',
      reflectionQuestions: [
        'What attacks has God shielded you from?',
        'Where do you need God\'s protection today?',
        'How can you raise the shield of faith?'
      ]
    },
    {
      id: 'bridegroom',
      name: 'The Bridegroom',
      translation: 'Intimate Relationship',
      greek: 'Νυμφίος',
      meaning: 'The divine husband of the Church',
      firstMention: 'Matthew 9:15',
      keyVerses: ['Matthew 9:15', 'John 3:29', 'Revelation 19:7'],
      significance: 'Christ\'s intimate love for His Church',
      context: 'Jewish wedding imagery',
      application: 'Prepare as a bride for the coming Bridegroom',
      prayer: 'Divine Bridegroom, prepare my heart for Your coming.',
      reflectionQuestions: [
        'How does Christ\'s love as Bridegroom affect you?',
        'Are you preparing for the wedding feast?',
        'What does spiritual intimacy with Christ mean?'
      ]
    },
    {
      id: 'cornerstone',
      name: 'The Cornerstone',
      translation: 'Foundation Stone',
      greek: 'Ἀκρογωνιαῖος',
      meaning: 'The essential stone that aligns the entire building',
      firstMention: 'Psalm 118:22',
      keyVerses: ['Psalm 118:22', '1 Peter 2:6', 'Ephesians 2:20'],
      significance: 'Christ is the foundation of God\'s spiritual temple',
      context: 'Rejected by builders but chosen by God',
      application: 'Align your life with the Cornerstone',
      prayer: 'Cornerstone, align my life with Your truth and purpose.',
      reflectionQuestions: [
        'Is Christ the cornerstone of your life?',
        'What needs to be realigned with Him?',
        'How are you building on this foundation?'
      ]
    },
    {
      id: 'light',
      name: 'The Light',
      translation: 'Divine Illumination',
      greek: 'Τὸ φῶς',
      meaning: 'The source of all spiritual enlightenment',
      firstMention: 'Genesis 1:3',
      keyVerses: ['Psalm 27:1', 'John 1:4-5', '1 John 1:5'],
      significance: 'God dispels darkness and reveals truth',
      context: 'Light versus darkness throughout Scripture',
      application: 'Walk in the light as He is in the light',
      prayer: 'Divine Light, illuminate my path and dispel all darkness.',
      reflectionQuestions: [
        'What darkness needs God\'s light?',
        'How can you walk in the light?',
        'Who needs to see God\'s light through you?'
      ]
    },
    {
      id: 'judge',
      name: 'The Judge',
      translation: 'Righteous Arbitrator',
      hebrew: 'שֹׁפֵט',
      meaning: 'The one who judges with perfect justice',
      firstMention: 'Genesis 18:25',
      keyVerses: ['Genesis 18:25', 'Psalm 96:13', '2 Timothy 4:8'],
      significance: 'God judges with perfect wisdom and fairness',
      context: 'Ancient Near Eastern concept of divine justice',
      application: 'Trust God\'s justice and live righteously',
      prayer: 'Righteous Judge, I trust Your perfect justice and mercy.',
      reflectionQuestions: [
        'How does God\'s role as Judge comfort you?',
        'Are you ready to stand before the Judge?',
        'How can you reflect His justice?'
      ]
    },
    {
      id: 'advocate',
      name: 'The Advocate',
      translation: 'Divine Defence Attorney',
      greek: 'Παράκλητος',
      meaning: 'One who comes alongside to help and defend',
      firstMention: 'John 14:16',
      keyVerses: ['John 14:16', '1 John 2:1', 'Romans 8:26'],
      significance: 'The Holy Spirit and Jesus advocate for us',
      context: 'Legal term for defence attorney',
      application: 'Rest in your divine Advocate\'s defence',
      prayer: 'Divine Advocate, thank You for defending and interceding for me.',
      reflectionQuestions: [
        'How does having an Advocate change your prayers?',
        'What accusations need the Advocate\'s defence?',
        'How can you advocate for others?'
      ]
    },
    {
      id: 'great-physician',
      name: 'The Great Physician',
      translation: 'Divine Healer',
      greek: 'Ἰατρός',
      meaning: 'The ultimate healer of body, soul, and spirit',
      firstMention: 'Matthew 9:12',
      keyVerses: ['Matthew 9:12', 'Luke 4:23', 'Jeremiah 8:22'],
      significance: 'Jesus heals all manner of brokenness',
      context: 'Jesus\' healing ministry',
      application: 'Bring all wounds to the Great Physician',
      prayer: 'Great Physician, heal my body, soul, and spirit completely.',
      reflectionQuestions: [
        'What needs the Great Physician\'s healing touch?',
        'How has He healed you already?',
        'Who can you bring to the Great Physician?'
      ]
    },
    {
      id: 'lion-of-judah',
      name: 'The Lion of Judah',
      translation: 'Conquering King',
      hebrew: 'אַרְיֵה יְהוּדָה',
      meaning: 'The powerful, conquering Messiah from Judah\'s tribe',
      firstMention: 'Genesis 49:9',
      keyVerses: ['Genesis 49:9', 'Revelation 5:5', 'Hosea 11:10'],
      significance: 'Christ conquers as the prophesied Lion',
      context: 'Messianic prophecy from Jacob\'s blessing',
      application: 'Trust in the Lion\'s ultimate victory',
      prayer: 'Lion of Judah, roar over my enemies and establish Your kingdom.',
      reflectionQuestions: [
        'How does the Lion\'s power encourage you?',
        'What battles need the Lion\'s intervention?',
        'How can you proclaim His victory?'
      ]
    },
    {
      id: 'resurrection-life',
      name: 'The Resurrection and the Life',
      translation: 'Victory Over Death',
      greek: 'Ἡ ἀνάστασις καὶ ἡ ζωή',
      meaning: 'The source of resurrection power and eternal life',
      firstMention: 'John 11:25',
      keyVerses: ['John 11:25', '1 Corinthians 15:20', 'Romans 6:9'],
      significance: 'Jesus conquered death and gives eternal life',
      context: 'Spoken before raising Lazarus',
      application: 'Live in resurrection power today',
      prayer: 'Resurrection and Life, raise me to newness of life in You.',
      reflectionQuestions: [
        'How does resurrection power change your life?',
        'What needs to be resurrected in you?',
        'How can you share this life with others?'
      ]
    },
    {
      id: 'way-truth-life',
      name: 'The Way, the Truth, and the Life',
      translation: 'Exclusive Path to God',
      greek: 'Ἡ ὁδὸς καὶ ἡ ἀλήθεια καὶ ἡ ζωή',
      meaning: 'The only path to the Father, embodiment of truth and life',
      firstMention: 'John 14:6',
      keyVerses: ['John 14:6', 'Acts 4:12', 'Hebrews 10:20'],
      significance: 'Jesus is the exclusive way to salvation',
      context: 'Jesus comforting disciples before crucifixion',
      application: 'Follow the Way, believe the Truth, live the Life',
      prayer: 'Lord Jesus, You are my Way, my Truth, and my Life. Guide me to the Father.',
      reflectionQuestions: [
        'How is Jesus the Way in your journey?',
        'What truth do you need to embrace?',
        'How can you experience His life more fully?'
      ]
    }
  ]
};

function NamesOfGodStudy() {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [expandedCards, setExpandedCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showDevotional, setShowDevotional] = useState(false);
  const [devotionalName, setDevotionalName] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [activeTab, setActiveTab] = useState({});

  const [devotionalSettings, setDevotionalSettings] = useState({
    length: '5-min', // '2-min', '5-min', '10-min'
    difficulty: 'intermediate', // 'beginner', 'intermediate', 'advanced'
    readingPlan: 'focus', // 'focus', '30-day', '60-day'
    weeklyTheme: true
  });
  const [currentWeek, setCurrentWeek] = useState(1);
  const [devotionalJournal, setDevotionalJournal] = useState('');

  const [studyData, setStudyData] = useState({
    studied: [],
    bookmarked: [],
    notes: {},
    prayers: {},
    reflectionAnswers: {},
    lastVisit: new Date().toISOString(),
    streak: 0,
    devotionalProgress: {},
    weeklyProgress: {}
  });

  // Load data on mount
  useEffect(() => {
    try {
      const saved = localStorage?.getItem('namesOfGodStudy');
      if (saved) {
        setStudyData(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    
    try {
      const savedTheme = localStorage?.getItem('theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
    
    if (!localStorage?.getItem('tutorialSeen')) {
      setShowTutorial(true);
    }
    
    updateStreak();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    try {
      localStorage?.setItem('namesOfGodStudy', JSON.stringify(studyData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [studyData]);

  // Update theme
  useEffect(() => {
    try {
      localStorage?.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  }, [isDarkMode]);

  const updateStreak = () => {
    const lastVisit = new Date(studyData.lastVisit);
    const today = new Date();
    const daysDiff = Math.floor((today - lastVisit) / (1000 * 60 * 60 * 24));
    const newStreak = daysDiff <= 1 ? (studyData.streak || 0) + 1 : 1;
    
    setStudyData(prev => ({
      ...prev,
      streak: newStreak,
      lastVisit: today.toISOString()
    }));
  };

  const getAllNames = () => {
    return [
      ...namesDatabase.hebrew.map(n => ({ ...n, category: 'hebrew' })),
      ...namesDatabase.greek.map(n => ({ ...n, category: 'greek' })),
      ...namesDatabase.descriptive.map(n => ({ ...n, category: 'descriptive' }))
    ];
  };

  const getFilteredNames = () => {
    let names = getAllNames();
    
    if (currentFilter === 'bookmarked') {
      names = names.filter(n => studyData.bookmarked.includes(n.id));
    } else if (currentFilter !== 'all') {
      names = names.filter(n => n.category === currentFilter);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      names = names.filter(n => 
        n.name.toLowerCase().includes(term) ||
        n.translation.toLowerCase().includes(term) ||
        n.meaning.toLowerCase().includes(term)
      );
    }
    
    return names;
  };

  const toggleCard = (id) => {
    setExpandedCards(prev => {
      const isExpanded = prev.includes(id);
      if (!isExpanded && !studyData.studied.includes(id)) {
        setStudyData(prev => ({
          ...prev,
          studied: [...prev.studied, id]
        }));
      }
      return isExpanded 
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id];
    });
  };

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    setStudyData(prev => ({
      ...prev,
      bookmarked: prev.bookmarked.includes(id)
        ? prev.bookmarked.filter(bookId => bookId !== id)
        : [...prev.bookmarked, id]
    }));
  };

  const pronounceName = (pronunciation, e) => {
    e.stopPropagation();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      let phoneticText = pronunciation
        .replace(/\s+/g, ' ')
        .trim();
      
      const utterance = new SpeechSynthesisUtterance(phoneticText);
      utterance.rate = 0.8;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en') && 
        (voice.name.includes('Google') || voice.name.includes('Microsoft'))
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert(`Pronunciation: ${pronunciation}`);
    }
  };

  const saveNote = (id, note) => {
    setStudyData(prev => ({
      ...prev,
      notes: { ...prev.notes, [id]: note }
    }));
  };

  const savePrayer = (id, prayer) => {
    setStudyData(prev => ({
      ...prev,
      prayers: { ...prev.prayers, [id]: prayer }
    }));
  };

  const getWeeklyTheme = () => {
    const themes = [
      { 
        week: 1, 
        theme: "God's Creative Power", 
        names: ['elohim', 'el-shaddai', 'el-gibbor'],
        focus: "Discovering God as our Creator and source of strength"
      },
      { 
        week: 2, 
        theme: "God's Covenant Faithfulness", 
        names: ['yahweh', 'adonai', 'yahweh-tsidkenu'],
        focus: "Understanding God's unchanging promises and lordship"
      },
      { 
        week: 3, 
        theme: "God's Provision and Care", 
        names: ['yahweh-jireh', 'yahweh-rapha', 'yahweh-raah'],
        focus: "Experiencing God as our Provider, Healer, and Shepherd"
      },
      { 
        week: 4, 
        theme: "God's Presence and Peace", 
        names: ['yahweh-shalom', 'yahweh-shammah', 'emmanuel'],
        focus: "Knowing God's peace and constant presence with us"
      },
      { 
        week: 5, 
        theme: "Christ Our Savior", 
        names: ['jesus', 'lamb-of-god', 'saviour'],
        focus: "Celebrating Jesus as our salvation and redemption"
      },
      { 
        week: 6, 
        theme: "Christ Our Life", 
        names: ['bread-of-life', 'light-of-world', 'way-truth-life'],
        focus: "Living in Christ as our spiritual sustenance and guidance"
      }
    ];
    return themes[(currentWeek - 1) % themes.length];
  };

  const generateEnhancedDevotional = () => {
    const theme = getWeeklyTheme();
    const themeNames = theme.names.map(id => getAllNames().find(n => n.id === id)).filter(Boolean);
    const randomName = devotionalSettings.weeklyTheme 
      ? themeNames[Math.floor(Math.random() * themeNames.length)]
      : getAllNames()[Math.floor(Math.random() * getAllNames().length)];
    
    setDevotionalName(randomName);
    setDevotionalJournal('');
    
    // Enhanced pronunciation with better phonetic breakdown
    if ('speechSynthesis' in window && randomName.pronunciation) {
      setTimeout(() => {
        window.speechSynthesis.cancel();
        
        // More natural pronunciation with pauses
        let phoneticText = randomName.pronunciation
          .replace(/El-/g, 'El... ')
          .replace(/Yah-/g, 'Yah... ')
          .replace(/ah-/g, 'ah... ')
          .replace(/-/g, '... ')
          .replace(/heem/gi, 'heem')
          .replace(/way/gi, 'way')
          .replace(/nigh/gi, 'nigh');
        
        const utterance = new SpeechSynthesisUtterance(phoneticText);
        utterance.rate = 0.6; // Slower for learning
        utterance.pitch = 1.0;
        utterance.volume = 0.9;
        
        // Try to use a more natural voice
        const voices = window.speechSynthesis.getVoices();
        const naturalVoice = voices.find(voice => 
          voice.lang.startsWith('en') && 
          (voice.name.includes('Natural') || voice.name.includes('Neural') || voice.name.includes('Premium'))
        ) || voices.find(voice => voice.lang.startsWith('en-US'));
        
        if (naturalVoice) {
          utterance.voice = naturalVoice;
        }
        
        window.speechSynthesis.speak(utterance);
      }, 800);
    }
  };

  const getDevotionalContent = (name) => {
    const settings = devotionalSettings;
    const theme = getWeeklyTheme();
    
    const content = {
      openingPrayer: `Heavenly Father, reveal Yourself to me today through Your name ${name.name}. Open my heart to understand Your character and my mind to grasp Your truth. Speak to me through Your Word. In Jesus' name, Amen.`,
      
      introduction: settings.length === '2-min' 
        ? `Today we explore ${name.name}, meaning "${name.translation}." This name reveals God's character and invites us into deeper relationship with Him.`
        : settings.length === '5-min'
        ? `God reveals Himself through His names, and today we discover Him as ${name.name} - "${name.translation}." In Scripture, names carry deep meaning, representing character, purpose, and destiny. When God reveals His name, He's sharing His very essence with us.`
        : `Throughout Scripture, God reveals Himself through His sacred names, each one a window into His infinite character. Today, we encounter Him as ${name.name} - "${name.translation}." This isn't merely a title; it's an invitation to know God intimately and personally. In ancient Hebrew culture, a name represented the very essence of a person. When God shares His name, He's opening His heart to us.`,
      
      scriptureReading: name.keyVerses.slice(0, settings.length === '10-min' ? 4 : settings.length === '5-min' ? 3 : 2),
      
      bibleStudy: settings.difficulty === 'beginner'
        ? `The name ${name.name} teaches us that God is ${name.translation.toLowerCase()}. ${name.significance} This means we can trust Him completely in every situation.`
        : settings.difficulty === 'intermediate'
        ? `${name.significance} The historical context reveals that ${name.context} This name appears first in ${name.firstMention}, establishing its foundational importance in understanding God's character.`
        : `Theologically, ${name.name} (${name.hebrew || name.greek || 'Hebrew/Greek'}) carries profound implications for our understanding of God's nature. ${name.significance} The original language context suggests depths of meaning that transform how we approach God. ${name.context} This reveals not just who God is, but how He relates to His people throughout redemptive history.`,
      
      practicalApplication: settings.length === '2-min'
        ? `Today, remember that God is your ${name.translation.toLowerCase()}. Trust Him in whatever you're facing.`
        : settings.length === '5-min'
        ? `${name.application} Consider how knowing God as ${name.name} changes your perspective on current challenges. Let this truth reshape your prayers, decisions, and relationships today.`
        : `${name.application} In our daily walk, this name transforms how we view our circumstances, relationships, and future. When anxiety comes, remember He is ${name.translation}. When you feel alone, recall that He is ${name.translation}. Let this name become a fortress of truth in your heart, shaping your thoughts and responses throughout the day.`,
      
      reflectionQuestions: settings.difficulty === 'beginner'
        ? [
            `How does knowing God as ${name.name} encourage you today?`,
            `What situation in your life needs this truth?`
          ]
        : settings.difficulty === 'intermediate'
        ? name.reflectionQuestions.slice(0, 2)
        : name.reflectionQuestions,
      
      bibleReadingPlan: devotionalSettings.readingPlan === '30-day' 
        ? `📖 Today's Bible Reading: Read ${name.firstMention.split(' ')[0]} chapters 1-3. Look for how God reveals His character.`
        : devotionalSettings.readingPlan === '60-day'
        ? `📖 Extended Study: Read the entire book of ${name.firstMention.split(' ')[0]} this week. Notice how God's names develop throughout.`
        : `📖 Focused Reading: Read ${name.keyVerses.join(', ')} in multiple translations (ESV, NIV, NASB). Compare how each translation reveals nuances of meaning.`,
      
      prayer: `${name.prayer} [Personal prayer time: Talk to God using this name. Thank Him for being your ${name.translation}. Ask Him to help you live in light of this truth.]`,
      
      actionStep: settings.length === '2-min'
        ? `Memorize: "${name.name} means ${name.translation}"`
        : settings.length === '5-min'
        ? `Choose one verse from today's reading to memorize. Write it on a card and carry it with you.`
        : `This week, practice using this name in your prayers. Share with someone how God has shown Himself as ${name.name} in your life. Begin memorizing ${name.firstMention}.`,
      
      closingBlessing: `May ${name.name}, your ${name.translation}, bless you and keep you today. May His face shine upon you and give you peace. Go in the strength and confidence of knowing who your God is. Amen.`
    };
    
    return content;
  };

  const generateStudyGuide = () => {
    const date = new Date().toLocaleDateString();
    
    const generateNameSection = (name) => {
      const isBookmarked = studyData.bookmarked.includes(name.id);
      const hasNote = studyData.notes[name.id];
      const hasPrayer = studyData.prayers?.[name.id];
      
      return `
      <div class="name-section">
        <div class="name-header">
          <h3>${name.name} ${isBookmarked ? '★' : ''}</h3>
          <p style="font-size: 1.2em; margin: 0.5em 0;">${name.translation}</p>
          ${name.hebrew ? `<p class="hebrew-greek">Hebrew: ${name.hebrew}</p>` : ''}
          ${name.greek ? `<p class="hebrew-greek">Greek: ${name.greek}</p>` : ''}
          ${name.pronunciation ? `<p style="margin: 0.5em 0;"><strong>Pronunciation:</strong> ${name.pronunciation}</p>` : ''}
        </div>
        
        <h4>Meaning</h4>
        <p>${name.meaning}</p>
        
        <h4>First Mention</h4>
        <p>${name.firstMention}</p>
        
        <h4>Theological Significance</h4>
        <p>${name.significance}</p>
        
        <h4>Historical Context</h4>
        <p>${name.context}</p>
        
        <h4>Biblical References (KJV)</h4>
        ${name.keyVerses.map(verse => `
          <div class="verse-container">
            <div class="verse-reference">${verse}</div>
            <div class="verse-text">${bibleVerses[verse] || 'Verse text not available'}</div>
          </div>
        `).join('')}
        
        <h4>Practical Application</h4>
        <p>${name.application}</p>
        
        <h4>Reflection Questions</h4>
        ${name.reflectionQuestions.map((question, index) => `
          <div class="reflection-question">
            <p><strong>${index + 1}. ${question}</strong></p>
            <div class="user-answer">
              ${studyData.reflectionAnswers?.[`${name.id}-${index}`] || '<em>No answer provided</em>'}
            </div>
          </div>
        `).join('')}
        
        <div class="prayer-box">
          <h4>Prayer Using This Name</h4>
          <p><em>${name.prayer}</em></p>
        </div>
        
        ${hasPrayer ? `
          <div class="user-prayer">
            <h4>Your Personal Prayer</h4>
            <p>${studyData.prayers[name.id].replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}
        
        ${hasNote ? `
          <div class="user-note">
            <h4>Your Notes</h4>
            <p>${studyData.notes[name.id].replace(/\n/g, '<br>')}</p>
          </div>
        ` : ''}
      </div>
      `;
    };

    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Names of God Study Guide</title>
<style>
  @media print {
    @page { margin: 0.5in; }
    .no-print { display: none !important; }
    .page-break { page-break-after: always; }
  }
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
    margin: 0;
    padding: 20px;
  }
  #study-guide-container {
    background: #ffffff;
    max-width: 800px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 0.5em;
    font-size: 2.5em;
  }
  h2 {
    color: #3498db;
    border-bottom: 2px solid #3498db;
    padding-bottom: 0.3em;
    margin-top: 2em;
  }
  h3 {
    color: #2c3e50;
    margin-top: 1.5em;
    font-size: 1.5em;
  }
  h4 {
    color: #34495e;
    margin-top: 1em;
  }
  .header-info {
    text-align: center;
    margin-bottom: 2em;
    color: #666;
  }
  .name-section {
    background: #ffffff;
    margin-bottom: 3em;
    page-break-inside: avoid;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 20px;
  }
  .name-header {
    background: linear-gradient(135deg, #2c3e50, #3498db);
    color: white;
    padding: 1.5em;
    border-radius: 8px;
    margin: -20px -20px 20px -20px;
  }
  .name-header h3 {
    color: white;
    margin: 0 0 0.5em 0;
  }
  .hebrew-greek {
    font-size: 1.2em;
    opacity: 0.9;
    margin: 0.5em 0;
  }
  .verse-container {
    background: #f8f9fa;
    border-left: 4px solid #3498db;
    padding: 1em;
    margin: 1em 0;
    border-radius: 4px;
  }
  .verse-reference {
    font-weight: bold;
    color: #2980b9;
    margin-bottom: 0.5em;
  }
  .verse-text {
    font-style: italic;
    color: #555;
  }
  .prayer-box {
    background: linear-gradient(135deg, rgba(52,152,219,0.1), rgba(231,76,60,0.1));
    padding: 1.5em;
    border-radius: 8px;
    margin: 1em 0;
  }
  .reflection-question {
    background: #f8f8f8;
    padding: 1em;
    margin: 0.5em 0;
    border-left: 3px solid #e74c3c;
    border-radius: 4px;
  }
  .user-answer {
    margin-top: 0.5em;
    padding: 0.5em;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: white;
    min-height: 2em;
    white-space: pre-wrap;
  }
  .user-note {
    background: #fffbf0;
    border: 1px solid #f0e68c;
    padding: 1em;
    margin: 1em 0;
    border-radius: 4px;
  }
  .user-prayer {
    background: #f0f8ff;
    border: 1px solid #add8e6;
    padding: 1em;
    margin: 1em 0;
    border-radius: 4px;
  }
  .progress-section {
    background: #f8f9fa;
    padding: 1.5em;
    border-radius: 8px;
    margin-bottom: 2em;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1em;
    margin-top: 1em;
  }
  .stat-card {
    background: white;
    padding: 1em;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  .stat-number {
    font-size: 2em;
    font-weight: bold;
    color: #3498db;
  }
  .stat-label {
    color: #666;
    font-size: 0.9em;
  }
</style>
</head>
<body>
<div id="study-guide-container">
  <h1>Names of God Study Guide</h1>
  <div class="header-info">
    <p>Generated on: ${date}</p>
    <p>A comprehensive guide to understanding the biblical names and titles of God</p>
  </div>
  
  <div class="progress-section">
    <h2>Your Study Progress</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-number">${studyData.studied.length}</div>
        <div class="stat-label">Names Studied</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${studyData.bookmarked.length}</div>
        <div class="stat-label">Bookmarked</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${Object.keys(studyData.notes).length}</div>
        <div class="stat-label">Notes Added</div>
      </div>
      <div class="stat-card">
        <div class="stat-number">${getProgress()}%</div>
        <div class="stat-label">Completion</div>
      </div>
    </div>
  </div>

  <h2>Hebrew Names (Old Testament)</h2>
  ${namesDatabase.hebrew.map(name => generateNameSection(name)).join('')}
  
  <h2>Greek Names (New Testament)</h2>
  ${namesDatabase.greek.map(name => generateNameSection(name)).join('')}
  
  <h2>Descriptive Titles</h2>
  ${namesDatabase.descriptive.map(name => generateNameSection(name)).join('')}
</div>
</body>
</html>
    `;
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Names-of-God-Study-Guide-${date.replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(studyData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `names-of-god-study-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const imported = JSON.parse(e.target.result);
          setStudyData(imported);
          alert('Data imported successfully!');
        } catch (error) {
          alert('Error importing data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all your study data? This cannot be undone.')) {
      setStudyData({
        studied: [],
        bookmarked: [],
        notes: {},
        prayers: {},
        reflectionAnswers: {},
        lastVisit: new Date().toISOString(),
        streak: 0
      });
      alert('All data has been cleared.');
    }
  };

  const getProgress = () => {
    const total = getAllNames().length;
    const studied = studyData.studied.length;
    return Math.round((studied / total) * 100);
  };

  const generatePrintableBrochure = () => {
    const brochureHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Names of God Study - Enhanced Study Guide</title>
    <meta name="description" content="Discover the character of God through His biblical names. Enhanced with daily devotionals, weekly themes, and interactive features.">
    
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.4;
            color: #2c3e50;
            background: #f8f9fa;
            padding: 15px;
            font-size: 10px;
        }
        
        .container {
            max-width: 100%;
            margin: 0 auto;
            background: white;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            border-radius: 8px;
            overflow: hidden;
            page-break-inside: avoid;
        }
        
        /* Header */
        .header {
            background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
            color: white;
            padding: 1rem;
            text-align: center;
        }
        
        .logo {
            width: 45px;
            height: 45px;
            margin: 0 auto 0.8rem;
            background: rgba(255,255,255,0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.6rem;
            backdropFilter: blur(10px);
            border: 2px solid rgba(255,255,255,0.2);
        }
        
        .main-title {
            font-size: 1.4rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .subtitle {
            font-size: 0.8rem;
            margin-bottom: 0.8rem;
            opacity: 0.9;
            font-weight: 400;
        }
        
        .verse-box {
            background: rgba(255,255,255,0.1);
            padding: 0.8rem;
            border-radius: 8px;
            margin: 0.8rem 0;
            border-left: 3px solid #e74c3c;
            backdropFilter: blur(10px);
        }
        
        .verse-text {
            font-size: 0.8rem;
            font-style: italic;
            margin-bottom: 0.3rem;
            line-height: 1.4;
        }
        
        .verse-ref {
            font-size: 0.7rem;
            font-weight: 600;
            opacity: 0.8;
        }
        
        .intro-text {
            font-size: 0.7rem;
            margin: 0.8rem 0;
            opacity: 0.9;
            line-height: 1.4;
        }
        
        .website-highlight {
            background: rgba(255,255,255,0.2);
            padding: 0.6rem 0.8rem;
            border-radius: 25px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-top: 0.8rem;
            border: 2px solid rgba(255,255,255,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }
        
        .website-highlight a {
            color: white;
            text-decoration: none;
        }
        
        .qr-code {
            width: 40px;
            height: 40px;
            background: white;
            border-radius: 6px;
            padding: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .qr-code img {
            width: 100%;
            height: 100%;
            border-radius: 3px;
        }
        
        /* Main Content */
        .main-content {
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.8rem;
        }
        
        .section {
            background: #f8f9fa;
            padding: 0.8rem;
            border-radius: 8px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            border-left: 3px solid #3498db;
        }
        
        .section h3 {
            color: #2c3e50;
            font-size: 0.9rem;
            font-weight: 700;
            margin-bottom: 0.6rem;
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
        
        .section-icon {
            width: 16px;
            height: 16px;
            background: #3498db;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 9px;
        }
        
        .steps {
            list-style: none;
            counter-reset: step-counter;
        }
        
        .steps li {
            counter-increment: step-counter;
            margin-bottom: 0.4rem;
            padding-left: 1.5rem;
            position: relative;
            font-size: 0.7rem;
            line-height: 1.3;
        }
        
        .steps li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            width: 16px;
            height: 16px;
            background: linear-gradient(135deg, #3498db, #e74c3c);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 8px;
            font-weight: 600;
        }
        
        .feature-list {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.2rem;
        }
        
        .feature-list li {
            padding: 0.3rem;
            background: white;
            border-radius: 4px;
            padding-left: 1.2rem;
            position: relative;
            font-size: 0.7rem;
        }
        
        .feature-list li::before {
            content: "✓";
            position: absolute;
            left: 0.3rem;
            color: #27ae60;
            font-weight: bold;
            font-size: 10px;
        }
        
        .categories {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.4rem;
            margin-top: 0.6rem;
        }
        
        .category {
            background: linear-gradient(135deg, #3498db, #2c3e50);
            color: white;
            padding: 0.4rem;
            border-radius: 6px;
            text-align: center;
            font-weight: 600;
            font-size: 0.6rem;
        }
        
        .devotional-features {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            padding: 0.8rem;
            border-radius: 8px;
            margin-bottom: 0.8rem;
            border-left: none;
        }
        
        .devotional-features h3 {
            color: white;
            margin-bottom: 0.6rem;
            font-size: 0.9rem;
        }
        
        .devotional-features .feature-list li {
            color: white;
            background: rgba(255,255,255,0.1);
        }
        
        .theme-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.3rem;
            margin-top: 0.6rem;
        }
        
        .theme-item {
            background: rgba(255,255,255,0.1);
            padding: 0.4rem;
            border-radius: 4px;
            font-size: 0.7rem;
        }
        
        .theme-week {
            font-weight: 600;
            margin-bottom: 0.2rem;
        }
        
        .theme-focus {
            opacity: 0.9;
            font-size: 0.6rem;
        }
        
        .tips {
            display: grid;
            gap: 0.5rem;
        }
        
        .tip-item {
            padding: 0.5rem;
            background: white;
            border-radius: 6px;
            border-left: 2px solid #e74c3c;
        }
        
        .tip-title {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.2rem;
            font-size: 0.7rem;
        }
        
        .tip-text {
            font-size: 0.6rem;
            color: #5a6c7d;
            line-height: 1.3;
        }
        
        /* Bottom Section */
        .bottom-section {
            padding: 1rem;
            background: linear-gradient(135deg, #ecf0f1 0%, #ffffff 100%);
        }
        
        .challenge-box {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 0.8rem;
            box-shadow: 0 3px 10px rgba(39,174,96,0.3);
        }
        
        .challenge-title {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 0.3rem;
        }
        
        .challenge-text {
            font-size: 0.8rem;
            margin-bottom: 0.8rem;
        }
        
        .website-footer {
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 0.8rem;
            border-radius: 20px;
            font-size: 0.7rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.6rem;
        }
        
        .website-footer a {
            color: white;
            text-decoration: none;
        }
        
        .remember-note {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 0.8rem;
            border-radius: 8px;
            text-align: center;
            font-size: 0.7rem;
            font-weight: 500;
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
                font-size: 9px;
            }
            
            .container {
                box-shadow: none;
                max-width: none;
                border-radius: 0;
            }
            
            .header {
                padding: 0.6rem;
            }
            
            .main-content {
                padding: 0.6rem;
                gap: 0.6rem;
            }
            
            .bottom-section {
                padding: 0.6rem;
            }
            
            .section {
                padding: 0.6rem;
            }
            
            .website-highlight,
            .website-footer {
                background: #ddd !important;
                color: #333 !important;
            }
            
            .website-highlight a,
            .website-footer a {
                color: #333 !important;
            }
            
            @page {
                margin: 0.5in;
                size: letter;
            }
        }
        
        /* Responsive adjustments for single page */
        @media screen and (max-width: 1024px) {
            .main-content {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header Section -->
        <div class="header">
            <div class="logo">📖</div>
            <h1 class="main-title">Names of God Study</h1>
            <p class="subtitle">Enhanced Interactive Bible Study with Daily Devotionals</p>
            
            <div class="verse-box">
                <p class="verse-text">"O LORD, our Lord, how majestic is your name in all the earth!"</p>
                <p class="verse-ref">Psalm 8:1</p>
            </div>
            
            <p class="intro-text">
                Discover God's character through 48 biblical names with enhanced daily devotionals, weekly themes, and interactive study tools. Perfect for individuals, families, and small groups.
            </p>
            
            <div class="website-highlight">
                <div class="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://names-of-god-study.vercel.app//" alt="QR Code">
                </div>
                <div>
                    <a href="https://names-of-god-study.vercel.app//" target="_blank">✨ Start Your Enhanced Study ✨</a>
                    <div style="font-size: 0.7rem; opacity: 0.8; margin-top: 0.2rem;">Scan to access full features</div>
                </div>
            </div>
        </div>
        
        <!-- Main Content -->
        <div class="main-content">
            <!-- Enhanced Features Section -->
            <div class="devotional-features">
                <h3>🌟 Enhanced Daily Devotionals</h3>
                <ul class="feature-list">
                    <li>📅 6-Week Themed Study Cycles</li>
                    <li>⏱️ Custom Length (2, 5, 10 minutes)</li>
                    <li>🎯 3 Difficulty Levels (Beginner to Advanced)</li>
                    <li>📖 Integrated Bible Reading Plans</li>
                    <li>🔊 Enhanced Audio Pronunciation</li>
                    <li>📝 Interactive Devotional Journaling</li>
                    <li>🙏 Personal Prayer Writing</li>
                    <li>💾 Progress Tracking & Saving</li>
                </ul>
            </div>
            
            <!-- Weekly Themes Section -->
            <div class="section">
                <h3><span class="section-icon">📅</span>6-Week Theme Cycles</h3>
                <div class="theme-grid">
                    <div class="theme-item">
                        <div class="theme-week">Week 1: God's Creative Power</div>
                        <div class="theme-focus">Elohim • El Shaddai • El Gibbor</div>
                    </div>
                    <div class="theme-item">
                        <div class="theme-week">Week 2: Covenant Faithfulness</div>
                        <div class="theme-focus">Yahweh • Adonai • Yahweh-Tsidkenu</div>
                    </div>
                    <div class="theme-item">
                        <div class="theme-week">Week 3: Provision and Care</div>
                        <div class="theme-focus">Yahweh-Jireh • Yahweh-Rapha • Yahweh-Ra'ah</div>
                    </div>
                    <div class="theme-item">
                        <div class="theme-week">Week 4: Presence and Peace</div>
                        <div class="theme-focus">Yahweh-Shalom • Yahweh-Shammah • Emmanuel</div>
                    </div>
                    <div class="theme-item">
                        <div class="theme-week">Week 5: Christ Our Savior</div>
                        <div class="theme-focus">Jesus • Lamb of God • Saviour</div>
                    </div>
                    <div class="theme-item">
                        <div class="theme-week">Week 6: Christ Our Life</div>
                        <div class="theme-focus">Bread of Life • Light of World • Way-Truth-Life</div>
                    </div>
                </div>
            </div>
            
            <!-- How to Use Section -->
            <div class="section">
                <h3><span class="section-icon">🚀</span>How to Use</h3>
                <ol class="steps">
                    <li>Visit website or scan QR code</li>
                    <li>Choose "Daily Devotional" for enhanced study</li>
                    <li>Select length, difficulty, and reading plan</li>
                    <li>Enable weekly themes or random study</li>
                    <li>Study names with audio pronunciation</li>
                    <li>Write in devotional journal</li>
                    <li>Save progress and track growth</li>
                    <li>Export study guides for offline use</li>
                </ol>
                
                <div class="categories">
                    <div class="category">18 Hebrew</div>
                    <div class="category">15 Greek</div>
                    <div class="category">15 Descriptive</div>
                </div>
            </div>
            
            <!-- Study Approaches Section -->
            <div class="section">
                <h3><span class="section-icon">💡</span>Study Approaches</h3>
                <div class="tips">
                    <div class="tip-item">
                        <div class="tip-title">Individual Daily Study</div>
                        <div class="tip-text">2-10 minute devotionals with journaling and reflection questions</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-title">Small Group Themes</div>
                        <div class="tip-text">Follow weekly themes together for unified discussion and study</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-title">Family Devotions</div>
                        <div class="tip-text">Use "Name of the Week" for meal discussions and family prayers</div>
                    </div>
                    <div class="tip-item">
                        <div class="tip-title">Church Series</div>
                        <div class="tip-text">6-week sermon series following themed study cycles</div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Bottom Section -->
        <div class="bottom-section">
            <div class="challenge-box">
                <div class="challenge-title">30-Day Enhanced Study Challenge</div>
                <div class="challenge-text">Experience God's character through daily devotionals and weekly themes</div>
                <div class="website-footer">
                    <div>
                        <a href="http://
names-of-god-study.vercel.app/" target="_blank">https://names-of-god-study.vercel.app/</a>
                        <div style="font-size: 0.6rem; opacity: 0.8;">Full-featured study platform</div>
                    </div>
                </div>
            </div>
            
            <div class="remember-note">
                <strong>✨ New Features:</strong> Enhanced devotionals with themes, journaling, multiple difficulty levels, and Bible reading plans complement our comprehensive 48-name study collection.
            </div>
        </div>
    </div>
    
    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
    </script>
</body>
</html>
    `;

    // Open the brochure in a new window
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(brochureHTML);
    newWindow.document.close();
    
    // Focus the new window for better user experience
    if (newWindow) {
      newWindow.focus();
    }
  };

  const generateSingleNamePrint = (name) => {
    const date = new Date().toLocaleDateString();
    const isBookmarked = studyData.bookmarked.includes(name.id);
    const hasNote = studyData.notes[name.id];
    const hasPrayer = studyData.prayers?.[name.id];
    
    const singleNameHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name.name} - Names of God Study</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Inter', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
            margin: 0;
            padding: 20px;
        }
        
        .container {
            background: #ffffff;
            max-width: 800px;
            margin: 0 auto;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .header {
            background: linear-gradient(135deg, #2c3e50, #3498db);
            color: white;
            padding: 2rem;
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
        }
        
        .name-title {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
            text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }
        
        .name-translation {
            font-size: 1.5rem;
            opacity: 0.9;
            margin-bottom: 1rem;
        }
        
        .name-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .detail-item {
            background: rgba(255,255,255,0.1);
            padding: 1rem;
            border-radius: 6px;
            text-align: center;
        }
        
        .detail-label {
            font-size: 0.9rem;
            opacity: 0.8;
            margin-bottom: 0.3rem;
        }
        
        .detail-value {
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .bookmark-indicator {
            display: inline-block;
            background: #e74c3c;
            color: white;
            padding: 0.3rem 0.8rem;
            border-radius: 20px;
            font-size: 0.8rem;
            margin-top: 1rem;
        }
        
        .content-section {
            margin-bottom: 2.5rem;
        }
        
        .section-title {
            color: #2c3e50;
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #3498db;
        }
        
        .verse-container {
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            padding: 1.5rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        
        .verse-reference {
            font-weight: bold;
            color: #2980b9;
            margin-bottom: 0.5rem;
            font-size: 1.1rem;
        }
        
        .verse-text {
            font-style: italic;
            color: #555;
            font-size: 1rem;
            line-height: 1.7;
        }
        
        .prayer-box {
            background: linear-gradient(135deg, rgba(52,152,219,0.1), rgba(231,76,60,0.1));
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1rem 0;
        }
        
        .prayer-title {
            font-weight: 700;
            color: #2c3e50;
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
        
        .reflection-question {
            background: #f8f8f8;
            padding: 1rem;
            margin: 0.5rem 0;
            border-left: 3px solid #e74c3c;
            border-radius: 4px;
        }
        
        .question-number {
            font-weight: bold;
            color: #e74c3c;
            margin-bottom: 0.5rem;
        }
        
        .user-answer {
            margin-top: 0.5rem;
            padding: 0.8rem;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: white;
            min-height: 3rem;
            white-space: pre-wrap;
            font-style: italic;
            color: #666;
        }
        
        .user-note {
            background: #fffbf0;
            border: 1px solid #f0e68c;
            padding: 1.5rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        
        .user-prayer {
            background: #f0f8ff;
            border: 1px solid #add8e6;
            padding: 1.5rem;
            margin: 1rem 0;
            border-radius: 4px;
        }
        
        .footer {
            text-align: center;
            margin-top: 2rem;
            padding-top: 1rem;
            border-top: 1px solid #eee;
            color: #666;
        }
        
        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                max-width: none;
                padding: 20px;
            }
            
            @page {
                margin: 0.5in;
                size: letter;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1 class="name-title">${name.name} ${isBookmarked ? '★' : ''}</h1>
            <p class="name-translation">${name.translation}</p>
            <div class="name-details">
                ${name.hebrew ? `
                    <div class="detail-item">
                        <div class="detail-label">Hebrew</div>
                        <div class="detail-value">${name.hebrew}</div>
                    </div>
                ` : ''}
                ${name.greek ? `
                    <div class="detail-item">
                        <div class="detail-label">Greek</div>
                        <div class="detail-value">${name.greek}</div>
                    </div>
                ` : ''}
                ${name.pronunciation ? `
                    <div class="detail-item">
                        <div class="detail-label">Pronunciation</div>
                        <div class="detail-value">${name.pronunciation}</div>
                    </div>
                ` : ''}
                <div class="detail-item">
                    <div class="detail-label">First Mention</div>
                    <div class="detail-value">${name.firstMention}</div>
                </div>
            </div>
            ${isBookmarked ? '<div class="bookmark-indicator">★ Bookmarked</div>' : ''}
        </div>
        
        <div class="content-section">
            <h2 class="section-title">Meaning</h2>
            <p>${name.meaning}</p>
        </div>
        
        <div class="content-section">
            <h2 class="section-title">Theological Significance</h2>
            <p>${name.significance}</p>
        </div>
        
        <div class="content-section">
            <h2 class="section-title">Historical Context</h2>
            <p>${name.context}</p>
        </div>
        
        <div class="content-section">
            <h2 class="section-title">Biblical References (KJV)</h2>
            ${name.keyVerses.map(verse => `
                <div class="verse-container">
                    <div class="verse-reference">${verse}</div>
                    <div class="verse-text">${bibleVerses[verse] || 'Verse text not available'}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="content-section">
            <h2 class="section-title">Practical Application</h2>
            <p>${name.application}</p>
        </div>
        
        <div class="content-section">
            <h2 class="section-title">Reflection Questions</h2>
            ${name.reflectionQuestions.map((question, index) => `
                <div class="reflection-question">
                    <div class="question-number">${index + 1}. ${question}</div>
                    <div class="user-answer">
                        ${studyData.reflectionAnswers?.[`${name.id}-${index}`] || 'No answer provided yet'}
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="content-section">
            <div class="prayer-box">
                <div class="prayer-title">Prayer Using This Name</div>
                <p><em>${name.prayer}</em></p>
            </div>
            
            ${hasPrayer ? `
                <div class="user-prayer">
                    <h3>Your Personal Prayer</h3>
                    <p>${studyData.prayers[name.id].replace(/\n/g, '<br>')}</p>
                </div>
            ` : ''}
        </div>
        
        ${hasNote ? `
            <div class="content-section">
                <div class="user-note">
                    <h3>Your Personal Notes</h3>
                    <p>${studyData.notes[name.id].replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        ` : ''}
        
        <div class="footer">
            <p>Generated on ${date} | Names of God Study</p>
            <p>Visit: <strong>localhost:3000</strong></p>
        </div>
    </div>
    
    <script>
        window.onload = function() {
            setTimeout(function() {
                window.print();
            }, 500);
        };
    </script>
</body>
</html>
    `;

    // Open the single name print in a new window
    const newWindow = window.open('', '_blank', 'width=800,height=600');
    newWindow.document.write(singleNameHTML);
    newWindow.document.close();
    
    if (newWindow) {
      newWindow.focus();
    }
  };

  const styles = {
    app: {
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#1a1a1a' : '#ecf0f1',
      color: isDarkMode ? '#f4f4f4' : '#333',
      transition: 'all 0.3s ease'
    },
    header: {
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    logo: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    controls: {
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    searchContainer: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    },
    searchInput: {
      padding: '0.5rem 2.5rem 0.5rem 1rem',
      border: 'none',
      borderRadius: '25px',
      width: '250px',
      fontSize: '0.9rem'
    },
    searchIcon: {
      position: 'absolute',
      right: '10px',
      color: '#2c3e50'
    },
    themeToggle: {
      background: 'none',
      border: '2px solid white',
      color: 'white',
      padding: '0.5rem 1rem',
      borderRadius: '25px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      transition: 'all 0.3s ease'
    },
    printGuideBtn: {
      background: '#27ae60', 
      color: 'white', 
      border: 'none', 
      padding: '0.5rem 1rem', 
      borderRadius: '25px', 
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },
    nav: {
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      padding: '1rem 0',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    navTabs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      flexWrap: 'wrap'
    },
    navTab: {
      padding: '0.75rem 1.5rem',
      backgroundColor: isDarkMode ? '#3a3a3a' : '#ecf0f1',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: '500',
      color: isDarkMode ? '#f4f4f4' : '#333'
    },
    navTabActive: {
      backgroundColor: '#3498db',
      color: 'white'
    },
    progressSection: {
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      marginBottom: '2rem'
    },
    progressBar: {
      width: '100%',
      height: '20px',
      backgroundColor: isDarkMode ? '#3a3a3a' : '#ecf0f1',
      borderRadius: '10px',
      overflow: 'hidden',
      marginTop: '1rem'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(to right, #3498db, #e74c3c)',
      transition: 'width 0.5s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.8rem',
      fontWeight: 'bold'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginTop: '1rem'
    },
    statCard: {
      backgroundColor: isDarkMode ? '#3a3a3a' : '#ecf0f1',
      padding: '1rem',
      borderRadius: '8px',
      textAlign: 'center'
    },
    statNumber: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#3498db'
    },
    statLabel: {
      fontSize: '0.9rem',
      opacity: 0.8
    },
    namesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem',
      margin: '2rem 0'
    },
    nameCard: {
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    nameCardExpanded: {
      gridColumn: '1 / -1'
    },
    nameHeader: {
      background: 'linear-gradient(135deg, #2c3e50, #3498db)',
      color: 'white',
      padding: '1.5rem',
      position: 'relative'
    },
    nameTitle: {
      fontSize: '1.5rem',
      marginBottom: '0.5rem'
    },
    nameTranslation: {
      fontSize: '1rem',
      opacity: 0.9
    },
    nameActions: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      display: 'flex',
      gap: '0.5rem'
    },
    actionBtn: {
      background: 'rgba(255,255,255,0.2)',
      border: 'none',
      color: 'white',
      width: '35px',
      height: '35px',
      borderRadius: '50%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s ease'
    },
    actionBtnBookmarked: {
      background: '#e74c3c'
    },
    namePreview: {
      padding: '1.5rem'
    },
    previewItem: {
      marginBottom: '1rem'
    },
    previewLabel: {
      fontWeight: 'bold',
      color: '#3498db',
      marginBottom: '0.25rem'
    },
    expandedContent: {
      padding: '2rem'
    },
    contentTabs: {
      display: 'flex',
      gap: '0.5rem',
      marginBottom: '1.5rem',
      borderBottom: '2px solid #ecf0f1',
      flexWrap: 'wrap'
    },
    contentTab: {
      padding: '0.5rem 1rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      position: 'relative',
      color: isDarkMode ? '#f4f4f4' : '#333'
    },
    contentTabActive: {
      color: '#3498db',
      borderBottom: '2px solid #3498db'
    },
    tabContent: {
      display: 'none'
    },
    tabContentActive: {
      display: 'block'
    },
    verseContainer: {
      backgroundColor: isDarkMode ? '#3a3a3a' : '#ecf0f1',
      padding: '1rem',
      borderRadius: '8px',
      margin: '1rem 0',
      borderLeft: '4px solid #3498db'
    },
    verseReference: {
      fontWeight: 'bold',
      color: '#3498db',
      marginBottom: '0.5rem'
    },
    verseText: {
      fontStyle: 'italic',
      lineHeight: 1.8
    },
    prayerBox: {
      background: isDarkMode 
        ? 'linear-gradient(135deg, rgba(52,152,219,0.2), rgba(231,76,60,0.2))'
        : 'linear-gradient(135deg, rgba(52,152,219,0.1), rgba(231,76,60,0.1))',
      padding: '1.5rem',
      borderRadius: '10px',
      margin: '1rem 0'
    },
    prayerTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '1rem',
      color: isDarkMode ? '#3498db' : '#2c3e50'
    },
    reflectionQuestions: {
      listStyle: 'none',
      padding: 0
    },
    reflectionQuestion: {
      padding: '1rem',
      marginBottom: '1rem',
      backgroundColor: isDarkMode ? '#3a3a3a' : '#ecf0f1',
      borderRadius: '8px',
      borderLeft: '3px solid #e74c3c'
    },
    noteInput: {
      width: '100%',
      minHeight: '100px',
      padding: '1rem',
      border: `2px solid ${isDarkMode ? '#4a4a4a' : '#ecf0f1'}`,
      borderRadius: '8px',
      fontFamily: 'inherit',
      fontSize: '1rem',
      resize: 'vertical',
      backgroundColor: isDarkMode ? '#3a3a3a' : 'white',
      color: isDarkMode ? '#f4f4f4' : '#333'
    },
    saveBtn: {
      marginTop: '1rem',
      padding: '0.75rem 2rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    devotionalMode: {
      background: 'linear-gradient(135deg, #2c3e50, #3498db)',
      color: 'white',
      padding: '3rem',
      textAlign: 'center',
      borderRadius: '10px',
      margin: '2rem 0'
    },
    devotionalName: {
      fontSize: '3rem',
      marginBottom: '1rem'
    },
    devotionalTranslation: {
      fontSize: '1.5rem',
      opacity: 0.9,
      marginBottom: '2rem'
    },
    newDevotionalBtn: {
      padding: '1rem 2rem',
      background: 'white',
      color: '#2c3e50',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    dataManagement: {
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      margin: '2rem 0'
    },
    dataButtons: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      marginTop: '1rem'
    },
    dataBtn: {
      padding: '0.75rem 1.5rem',
      border: '2px solid #3498db',
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      color: '#3498db',
      borderRadius: '25px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    studyTools: {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    toolBtn: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '1.2rem'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    },
    modalContent: {
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      padding: '2rem',
      borderRadius: '10px',
      maxWidth: '600px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      color: isDarkMode ? '#f4f4f4' : '#333'
    },
    tutorialOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    },
    tutorialContent: {
      backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
      padding: '2rem',
      borderRadius: '10px',
      maxWidth: '500px',
      textAlign: 'center'
    },
    tutorialSteps: {
      margin: '2rem 0',
      textAlign: 'left'
    },
    tutorialStep: {
      marginBottom: '1rem',
      paddingLeft: '2rem',
      position: 'relative'
    },
    tutorialStepNumber: {
      position: 'absolute',
      left: 0,
      width: '25px',
      height: '25px',
      backgroundColor: '#3498db',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.9rem',
      fontWeight: 'bold'
    },
    startTutorialBtn: {
      padding: '1rem 2rem',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      transition: 'all 0.3s ease'
    }
  };

  const NameCard = ({ name }) => {
    const isExpanded = expandedCards.includes(name.id);
    const isBookmarked = studyData.bookmarked.includes(name.id);
    const currentTab = activeTab[name.id] || 'overview';
    const [noteText, setNoteText] = useState(studyData.notes[name.id] || '');
    const [prayerText, setPrayerText] = useState(studyData.prayers?.[name.id] || '');

    return (
      <div 
        style={{
          ...styles.nameCard,
          ...(isExpanded ? styles.nameCardExpanded : {})
        }}
        onClick={() => toggleCard(name.id)}
      >
        <div style={styles.nameHeader}>
          <h3 style={styles.nameTitle}>{name.name}</h3>
          <p style={styles.nameTranslation}>{name.translation}</p>
          <div style={styles.nameActions}>
            <button 
              style={{
                ...styles.actionBtn,
                ...(isBookmarked ? styles.actionBtnBookmarked : {})
              }}
              onClick={(e) => toggleBookmark(name.id, e)}
              title="Bookmark"
            >
              <Bookmark size={18} />
            </button>
            {name.pronunciation && (
              <button 
                style={styles.actionBtn}
                onClick={(e) => pronounceName(name.pronunciation, e)}
                title="Pronunciation"
              >
                <Volume2 size={18} />
              </button>
            )}
            <button 
              style={styles.actionBtn}
              onClick={(e) => {
                e.stopPropagation();
                generateSingleNamePrint(name);
              }}
              title="Print This Name"
            >
              <Printer size={18} />
            </button>
            {studyData.notes[name.id] && (
              <span style={styles.actionBtn} title="Has Notes">
                <StickyNote size={18} />
              </span>
            )}
          </div>
        </div>
        
        <div style={styles.namePreview}>
          <div style={styles.previewItem}>
            <div style={styles.previewLabel}>Meaning:</div>
            <div>{name.meaning}</div>
          </div>
          <div style={styles.previewItem}>
            <div style={styles.previewLabel}>First Mention:</div>
            <div>{name.firstMention}</div>
          </div>
          {name.pronunciation && (
            <div style={styles.previewItem}>
              <div style={styles.previewLabel}>Pronunciation:</div>
              <div>{name.pronunciation}</div>
            </div>
          )}
        </div>
        
        {isExpanded && (
          <div style={styles.expandedContent}>
            <div style={styles.contentTabs}>
              {['overview', 'biblical', 'application', 'prayer', 'notes'].map(tab => (
                <button
                  key={tab}
                  style={{
                    ...styles.contentTab,
                    ...(currentTab === tab ? styles.contentTabActive : {})
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveTab(prev => ({ ...prev, [name.id]: tab }));
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
            
            <div style={{ ...styles.tabContent, ...(currentTab === 'overview' ? styles.tabContentActive : {}) }}>
              <h4>Etymology and Meaning</h4>
              <p>{name.meaning}</p>
              {name.pronunciation && <p><strong>Pronunciation:</strong> {name.pronunciation}</p>}
              {name.hebrew && <p><strong>Hebrew:</strong> {name.hebrew}</p>}
              {name.greek && <p><strong>Greek:</strong> {name.greek}</p>}
              
              <h4 style={{ marginTop: '1.5rem' }}>Theological Significance</h4>
              <p>{name.significance}</p>
              
              <h4 style={{ marginTop: '1.5rem' }}>Historical Context</h4>
              <p>{name.context}</p>
            </div>
            
            <div style={{ ...styles.tabContent, ...(currentTab === 'biblical' ? styles.tabContentActive : {}) }}>
              <h4>Key Bible Verses</h4>
              {name.keyVerses.map((verse, index) => (
                <div key={index} style={styles.verseContainer}>
                  <div style={styles.verseReference}>{verse}</div>
                  <div style={styles.verseText}>
                    {bibleVerses[verse] || 'Verse text not available'}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ ...styles.tabContent, ...(currentTab === 'application' ? styles.tabContentActive : {}) }}>
              <h4>Practical Application</h4>
              <p>{name.application}</p>
              
              <h4 style={{ marginTop: '1.5rem' }}>Reflection Questions</h4>
              <ul style={styles.reflectionQuestions}>
                {name.reflectionQuestions.map((question, index) => (
                  <li key={index} style={styles.reflectionQuestion}>
                    <div style={{ marginBottom: '0.5rem' }}><strong>{question}</strong></div>
                    <textarea
                      style={{
                        ...styles.noteInput,
                        minHeight: '60px',
                        marginTop: '0.5rem'
                      }}
                      placeholder="Type your answer here..."
                      value={studyData.reflectionAnswers?.[`${name.id}-${index}`] || ''}
                      onChange={(e) => {
                        e.stopPropagation();
                        setStudyData(prev => ({
                          ...prev,
                          reflectionAnswers: {
                            ...prev.reflectionAnswers,
                            [`${name.id}-${index}`]: e.target.value
                          }
                        }));
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ ...styles.tabContent, ...(currentTab === 'prayer' ? styles.tabContentActive : {}) }}>
              <div style={styles.prayerBox}>
                <div style={styles.prayerTitle}>Prayer Using This Name</div>
                <p>{name.prayer}</p>
              </div>
              
              <h4 style={{ marginTop: '1.5rem' }}>Write Your Own Prayer</h4>
              <textarea
                style={styles.noteInput}
                placeholder="Write a personal prayer using this name of God..."
                value={prayerText}
                onChange={(e) => setPrayerText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                style={styles.saveBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  savePrayer(name.id, prayerText);
                  alert('Prayer saved successfully!');
                }}
              >
                Save Prayer
              </button>
            </div>
            
            <div style={{ ...styles.tabContent, ...(currentTab === 'notes' ? styles.tabContentActive : {}) }}>
              <h4>My Personal Notes</h4>
              <textarea
                style={styles.noteInput}
                placeholder="Add your thoughts, insights, and revelations about this name..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
              <button 
                style={styles.saveBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  saveNote(name.id, noteText);
                  alert('Note saved successfully!');
                }}
              >
                Save Notes
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={styles.app}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={styles.headerContent}>
            <div style={styles.logo}>
              📖 Names of God Study
            </div>
            <div style={styles.controls}>
              <div style={styles.searchContainer}>
                <input
                  type="text"
                  style={styles.searchInput}
                  placeholder="Search names..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={20} style={styles.searchIcon} />
              </div>
              <button 
                style={styles.themeToggle}
                onClick={() => setIsDarkMode(!isDarkMode)}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                style={styles.printGuideBtn}
                onClick={generatePrintableBrochure}
              >
                📄 Print Guide
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.container}>
          <div style={styles.navTabs}>
            <button
              style={{ ...styles.navTab, ...(currentFilter === 'all' && !showDevotional ? styles.navTabActive : {}) }}
              onClick={() => { setCurrentFilter('all'); setShowDevotional(false); }}
            >
              All Names
            </button>
            <button
              style={{ ...styles.navTab, ...(currentFilter === 'hebrew' && !showDevotional ? styles.navTabActive : {}) }}
              onClick={() => { setCurrentFilter('hebrew'); setShowDevotional(false); }}
            >
              Hebrew Names
            </button>
            <button
              style={{ ...styles.navTab, ...(currentFilter === 'greek' && !showDevotional ? styles.navTabActive : {}) }}
              onClick={() => { setCurrentFilter('greek'); setShowDevotional(false); }}
            >
              Greek Names
            </button>
            <button
              style={{ ...styles.navTab, ...(currentFilter === 'descriptive' && !showDevotional ? styles.navTabActive : {}) }}
              onClick={() => { setCurrentFilter('descriptive'); setShowDevotional(false); }}
            >
              Descriptive Titles
            </button>
            <button
              style={{ ...styles.navTab, ...(currentFilter === 'bookmarked' && !showDevotional ? styles.navTabActive : {}) }}
              onClick={() => { setCurrentFilter('bookmarked'); setShowDevotional(false); }}
            >
              Bookmarked
            </button>
            <button
              style={{ ...styles.navTab, ...(showDevotional ? styles.navTabActive : {}) }}
              onClick={() => { setShowDevotional(true); generateEnhancedDevotional(); }}
            >
              Daily Devotional
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.container}>
        {!showDevotional ? (
          <>
            {/* Progress Section */}
            <section style={styles.progressSection}>
              <h2>Your Study Progress</h2>
              <div style={styles.progressBar}>
                <div style={{ ...styles.progressFill, width: `${getProgress()}%` }}>
                  {getProgress()}%
                </div>
              </div>
              <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{studyData.studied.length}</div>
                  <div style={styles.statLabel}>Names Studied</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{studyData.bookmarked.length}</div>
                  <div style={styles.statLabel}>Bookmarked</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{Object.keys(studyData.notes).length}</div>
                  <div style={styles.statLabel}>Notes Added</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{studyData.streak}</div>
                  <div style={styles.statLabel}>Day Streak</div>
                </div>
                <div style={styles.statCard}>
                  <div style={styles.statNumber}>{getAllNames().length}</div>
                  <div style={styles.statLabel}>Total Names</div>
                </div>
              </div>
            </section>

            {/* Names Grid */}
            <div style={styles.namesGrid}>
              {getFilteredNames().length === 0 ? (
                <div style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: isDarkMode ? '#2a2a2a' : 'white',
                  borderRadius: '10px'
                }}>
                  <h3>No names found</h3>
                  <p>Try adjusting your search terms or browse a different category.</p>
                </div>
              ) : (
                getFilteredNames().map(name => (
                  <NameCard key={name.id} name={name} />
                ))
              )}
            </div>
          </>
        ) : (
          /* Devotional Mode */
          <div style={styles.devotionalMode}>
            {devotionalName && (
              <>
                {/* Devotional Header */}
                <div style={{ marginBottom: '2rem' }}>
                  <div style={styles.devotionalName}>{devotionalName.name}</div>
                  <div style={styles.devotionalTranslation}>{devotionalName.translation}</div>
                  {devotionalName.pronunciation && (
                    <div style={{ fontSize: '1.1rem', marginBottom: '1rem', opacity: 0.8 }}>
                      Pronunciation: {devotionalName.pronunciation}
                    </div>
                  )}
                  
                  {/* Weekly Theme Banner */}
                  {devotionalSettings.weeklyTheme && (
                    <div style={{
                      background: 'rgba(255,255,255,0.15)',
                      padding: '1rem',
                      borderRadius: '10px',
                      margin: '1rem 0',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                      <div style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                        📅 Week {getWeeklyTheme().week}: {getWeeklyTheme().theme}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                        {getWeeklyTheme().focus}
                      </div>
                    </div>
                  )}
                </div>

                {/* Devotional Settings */}
                <div style={{
                  background: 'rgba(255,255,255,0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  marginBottom: '2rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Devotional Length
                    </label>
                    <select 
                      value={devotionalSettings.length}
                      onChange={(e) => setDevotionalSettings(prev => ({ ...prev, length: e.target.value }))}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '5px',
                        border: 'none',
                        background: 'white',
                        color: '#333',
                        width: '100%'
                      }}
                    >
                      <option value="2-min">2 Minutes</option>
                      <option value="5-min">5 Minutes</option>
                      <option value="10-min">10 Minutes</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Study Depth
                    </label>
                    <select 
                      value={devotionalSettings.difficulty}
                      onChange={(e) => setDevotionalSettings(prev => ({ ...prev, difficulty: e.target.value }))}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '5px',
                        border: 'none',
                        background: 'white',
                        color: '#333',
                        width: '100%'
                      }}
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      Reading Plan
                    </label>
                    <select 
                      value={devotionalSettings.readingPlan}
                      onChange={(e) => setDevotionalSettings(prev => ({ ...prev, readingPlan: e.target.value }))}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '5px',
                        border: 'none',
                        background: 'white',
                        color: '#333',
                        width: '100%'
                      }}
                    >
                      <option value="focus">Focused Study</option>
                      <option value="30-day">30-Day Plan</option>
                      <option value="60-day">60-Day Plan</option>
                    </select>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input 
                      type="checkbox"
                      checked={devotionalSettings.weeklyTheme}
                      onChange={(e) => setDevotionalSettings(prev => ({ ...prev, weeklyTheme: e.target.checked }))}
                      style={{ transform: 'scale(1.2)' }}
                    />
                    <label style={{ fontSize: '0.9rem' }}>Weekly Themes</label>
                  </div>
                </div>

                {/* Main Devotional Content */}
                <div style={{ 
                  maxWidth: '800px', 
                  margin: '2rem auto', 
                  textAlign: 'left',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '2rem',
                  borderRadius: '10px',
                  backdropFilter: 'blur(5px)'
                }}>
                  {(() => {
                    const content = getDevotionalContent(devotionalName);
                    return (
                      <>
                        {/* Opening Prayer */}
                        <div style={{ marginBottom: '2rem', fontStyle: 'italic', fontSize: '1rem' }}>
                          <strong>Opening Prayer:</strong><br />
                          {content.openingPrayer}
                        </div>

                        {/* Introduction */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>Understanding {devotionalName.name}</h3>
                          <p>{content.introduction}</p>
                        </div>

                        {/* Scripture Reading */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>📖 Scripture Reading</h3>
                          {content.scriptureReading.map((verse, index) => (
                            <div key={index} style={{
                              background: 'rgba(255,255,255,0.15)',
                              padding: '1rem',
                              margin: '0.5rem 0',
                              borderRadius: '8px',
                              borderLeft: '3px solid #e74c3c'
                            }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#fff' }}>
                                {verse}
                              </div>
                              <div style={{ fontStyle: 'italic' }}>
                                "{bibleVerses[verse] || 'Verse text not available'}"
                              </div>
                            </div>
                          ))}
                          
                          {/* Bible Reading Plan */}
                          <div style={{
                            background: 'rgba(52,152,219,0.2)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginTop: '1rem'
                          }}>
                            {content.bibleReadingPlan}
                          </div>
                        </div>

                        {/* Bible Study */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>📚 Bible Study</h3>
                          <p>{content.bibleStudy}</p>
                        </div>

                        {/* Application */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🎯 Application</h3>
                          <p>{content.practicalApplication}</p>
                        </div>

                        {/* Reflection Questions */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🤔 Reflection Questions</h3>
                          {content.reflectionQuestions.map((question, index) => (
                            <div key={index} style={{
                              background: 'rgba(255,255,255,0.1)',
                              padding: '1rem',
                              margin: '0.5rem 0',
                              borderRadius: '8px'
                            }}>
                              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                                {index + 1}. {question}
                              </div>
                              <textarea
                                style={{
                                  width: '100%',
                                  minHeight: '60px',
                                  padding: '0.5rem',
                                  borderRadius: '5px',
                                  border: 'none',
                                  background: 'rgba(255,255,255,0.9)',
                                  color: '#333',
                                  resize: 'vertical'
                                }}
                                placeholder="Write your reflection here..."
                                value={studyData.reflectionAnswers?.[`${devotionalName.id}-devotional-${index}`] || ''}
                                onChange={(e) => {
                                  setStudyData(prev => ({
                                    ...prev,
                                    reflectionAnswers: {
                                      ...prev.reflectionAnswers,
                                      [`${devotionalName.id}-devotional-${index}`]: e.target.value
                                    }
                                  }));
                                }}
                              />
                            </div>
                          ))}
                        </div>

                        {/* Prayer Section */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>🙏 Prayer</h3>
                          <div style={{
                            background: 'rgba(231,76,60,0.2)',
                            padding: '1rem',
                            borderRadius: '8px',
                            marginBottom: '1rem'
                          }}>
                            <p style={{ fontStyle: 'italic' }}>{content.prayer}</p>
                          </div>
                          
                          <textarea
                            style={{
                              width: '100%',
                              minHeight: '100px',
                              padding: '1rem',
                              borderRadius: '8px',
                              border: 'none',
                              background: 'rgba(255,255,255,0.9)',
                              color: '#333',
                              resize: 'vertical'
                            }}
                            placeholder="Write your personal prayer using this name of God..."
                            value={devotionalJournal}
                            onChange={(e) => setDevotionalJournal(e.target.value)}
                          />
                        </div>

                        {/* Action Step */}
                        <div style={{ marginBottom: '2rem' }}>
                          <h3 style={{ marginBottom: '1rem', color: '#fff' }}>✅ Today's Action</h3>
                          <div style={{
                            background: 'rgba(46,204,113,0.2)',
                            padding: '1rem',
                            borderRadius: '8px'
                          }}>
                            {content.actionStep}
                          </div>
                        </div>

                        {/* Closing Blessing */}
                        <div style={{ 
                          textAlign: 'center',
                          fontStyle: 'italic',
                          fontSize: '1rem',
                          background: 'rgba(255,255,255,0.1)',
                          padding: '1rem',
                          borderRadius: '8px'
                        }}>
                          <strong>Closing Blessing:</strong><br />
                          {content.closingBlessing}
                        </div>
                      </>
                    );
                  })()}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button 
                    style={styles.newDevotionalBtn} 
                    onClick={generateEnhancedDevotional}
                  >
                    <Shuffle size={20} /> New Devotional
                  </button>
                  
                  <button 
                    style={{
                      ...styles.newDevotionalBtn,
                      background: '#27ae60'
                    }}
                    onClick={() => {
                      if (devotionalJournal.trim()) {
                        setStudyData(prev => ({
                          ...prev,
                          devotionalProgress: {
                            ...prev.devotionalProgress,
                            [new Date().toDateString()]: {
                              name: devotionalName.name,
                              journal: devotionalJournal,
                              settings: devotionalSettings
                            }
                          }
                        }));
                        alert('Devotional saved to your journal!');
                      } else {
                        alert('Please write in your prayer journal first.');
                      }
                    }}
                  >
                    💾 Save to Journal
                  </button>
                  
                  <button 
                    style={{
                      ...styles.newDevotionalBtn,
                      background: '#9b59b6'
                    }}
                    onClick={() => setCurrentWeek(currentWeek < 6 ? currentWeek + 1 : 1)}
                  >
                    📅 Next Week
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Data Management */}
        <section style={styles.dataManagement}>
          <h2>Data Management</h2>
          <p>Export your study progress for backup or transfer to other devices. Complete study guide includes all names with your personal notes and prayers.</p>
          <div style={styles.dataButtons}>
            <button 
              style={{ ...styles.dataBtn, backgroundColor: '#27ae60', color: 'white', border: 'none' }}
              onClick={generateStudyGuide}
            >
              <Download size={20} /> Download Study Guide
            </button>
            <button style={styles.dataBtn} onClick={exportData}>
              <Download size={20} /> Export Data
            </button>
            <label style={styles.dataBtn}>
              <Upload size={20} /> Import Data
              <input 
                type="file" 
                accept=".json" 
                style={{ display: 'none' }}
                onChange={importData}
              />
            </label>
            <button style={styles.dataBtn} onClick={() => window.print()}>
              <Printer size={20} /> Quick Print
            </button>
            <button style={styles.dataBtn} onClick={clearAllData}>
              <Trash2 size={20} /> Clear All Data
            </button>
          </div>
        </section>
      </main>

      {/* Study Tools */}
      <div style={styles.studyTools}>
        <button 
          style={styles.toolBtn} 
          onClick={() => setShowNotesModal(true)}
          title="View All Notes"
        >
          <StickyNote size={24} />
        </button>
        <button 
          style={styles.toolBtn} 
          onClick={generateEnhancedDevotional}
          title="Random Devotional"
        >
          <Shuffle size={24} />
        </button>
        <button 
          style={styles.toolBtn} 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          title="Back to Top"
        >
          <ArrowUp size={24} />
        </button>
      </div>

      {/* Notes Modal */}
      {showNotesModal && (
        <div style={styles.modal} onClick={() => setShowNotesModal(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h2>My Study Notes</h2>
              <button style={styles.closeBtn} onClick={() => setShowNotesModal(false)}>
                <X size={24} />
              </button>
            </div>
            <div>
              {Object.keys(studyData.notes).length === 0 ? (
                <p>No notes yet. Start studying the names and add your insights!</p>
              ) : (
                Object.entries(studyData.notes).map(([nameId, note]) => {
                  const name = getAllNames().find(n => n.id === nameId);
                  return name && note ? (
                    <div key={nameId} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: isDarkMode ? '#3a3a3a' : '#f8f9fa', borderRadius: '8px' }}>
                      <h4>{name.name} - {name.translation}</h4>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{note}</p>
                    </div>
                  ) : null;
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tutorial */}
      {showTutorial && (
        <div style={styles.tutorialOverlay} onClick={() => { setShowTutorial(false); localStorage?.setItem('tutorialSeen', 'true'); }}>
          <div style={styles.tutorialContent} onClick={(e) => e.stopPropagation()}>
            <h2>Welcome to Names of God Study!</h2>
            <p>Discover the beauty and meaning behind the biblical names of God</p>
            <div style={styles.tutorialSteps}>
              <div style={styles.tutorialStep}>
                <span style={styles.tutorialStepNumber}>1</span>
                Click on any name card to explore its meaning and biblical context
              </div>
              <div style={styles.tutorialStep}>
                <span style={styles.tutorialStepNumber}>2</span>
                Use the bookmark icon to save your favourite names for quick access
              </div>
              <div style={styles.tutorialStep}>
                <span style={styles.tutorialStepNumber}>3</span>
                Add personal notes and reflections for each name
              </div>
              <div style={styles.tutorialStep}>
                <span style={styles.tutorialStepNumber}>4</span>
                Track your progress and maintain a daily study streak
              </div>
              <div style={styles.tutorialStep}>
                <span style={styles.tutorialStepNumber}>5</span>
                Export your data to continue studying across devices
              </div>
            </div>
            <button 
              style={styles.startTutorialBtn}
              onClick={() => { setShowTutorial(false); localStorage?.setItem('tutorialSeen', 'true'); }}
            >
              Start Studying
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NamesOfGodStudy;