﻿'use strict';
/**
 * _build-data.js â€” Diamond Springs Ranch
 * Built by Norris Jr | 2026-07-15
 * Voice rewrite by Claudia | 2026-08-24
 *
 * Diamond Springs Ranch is a working Western experience ranch
 * at 1734 SE 96th St, Sedgwick KS 67135 â€” 15 minutes north of Wichita.
 * Guests come for guided horseback rides, Highland cattle encounters,
 * luxury treehouse and covered wagon overnight stays, and private events.
 */

const CLIENT = {
  name:            'Diamond Springs Ranch',
  nameShort:       'Diamond Springs',
  tagline:         'Where the Real West Still Lives.',
  phone:           '(316) 303-6195',
  phoneTel:        '3163036195',
  email:           'susan@susanschrag.com',
  description:     'Diamond Springs Ranch is a working ranch in Sedgwick, KS - guided horseback rides, Highland cattle experiences, luxury treehouse and covered wagon stays, private events, and the Dinner Date Experience. About 15 minutes north of Wichita.',
  address:         '1734 SE 96th St, Sedgwick, KS 67135',
  domain:          'diamond-springs-ranch.com',
  state:           'KS',
  primaryCity:     'Sedgwick',
  primaryCityFull: 'Sedgwick, KS',
  hours:           'By Reservation Only &mdash; call or text (316) 303-6195',
  founderName:     'Logan Schrag',
  yearFounded:     '2016',
  license:         'Fully Insured | All Activities by Reservation',
  facebook:        'https://www.facebook.com/DiamondSpringsRanch',
  instagram:       'https://www.instagram.com/diamondspringsranch/',
  gbp:             'https://maps.app.goo.gl/AvwxBJ4pcsRiAyet8',
  reviewsUrl:      'https://maps.app.goo.gl/AvwxBJ4pcsRiAyet8',
  primaryColor:    '#F7A843',
  primaryDark:     '#c47d1a',
  secondaryColor:  '#2F2A26',
  accentColor:     '#7C4B2A',
  fontFamily:      "'Roboto Condensed', 'Arial Narrow', Arial, sans-serif",
  fontUrl:         'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap',
  ctaHeading:      'Come out to the ranch.',
  ctaSubtext:      'Everything is by reservation. Call or text (316) 303-6195 &mdash; we&rsquo;d love to have you out here.',
  turnstileSiteKey:'1x00000000000000000000AA', // CF test key â€” swap for real widget when live
  social:          [],

  // Build.js required fields
  phoneRaw:        '3163036195',
  tradeLabel:      'Ranch Experiences',
  openingHours:    'By Reservation Only',
  homepageTitle:       'Diamond Springs Ranch | Horseback Rides, Treehouse Stays &amp; More | Sedgwick, KS',
  homepageDescription: 'Diamond Springs Ranch in Sedgwick, KS: horseback rides, Highland cattle, treehouse stays &amp; private events. 15 minutes north of Wichita. (316) 303-6195.',
  heroHeading:     'Where the Cowboy Way Comes Alive &mdash; 15 Minutes North of Wichita',
  heroSubtext:     'Guided horseback trail rides. Highland cattle encounters. A luxury treehouse perched in the cottonwoods. A covered wagon under a Kansas sky. Real ranch experiences for families, couples, and groups &mdash; all by reservation.',
  heroBadge:       '&#x1F40E; Kansas Ranch Experiences',
  whyUsHeading:    'Why Diamond Springs Ranch Is Unlike Anything Else Near Wichita',
  whyUsIntro:      'There are plenty of places to ride horses. Diamond Springs is the only place where you can ride them, meet Highland cattle, sleep in a treehouse, and sit around a fire &mdash; all on a working ranch where none of it is manufactured.',
  serviceAreaIntro: 'We get guests from all over the Wichita metro and beyond. Whether you&rsquo;re in Wichita, Derby, Haysville, Andover, or Newton, you&rsquo;re a short drive away from something you won&rsquo;t find anywhere closer.',
  aboutTagline:    'A real working ranch. Real animals. Real memories.',
  aboutDescription: 'The story behind Diamond Springs Ranch in Sedgwick, KS &mdash; a working ranch 15 minutes north of Wichita built around faith, family, and giving people a place to slow down.',
  aboutBody:       '<p>When Byron and Susan Schrag bought this property in 2009, there wasn&rsquo;t much here besides a house and some acreage. But they had a vision for what it could become. Byron had grown up farming and ranching and knew there were things you could teach your kids around animals and on a piece of land that were hard to teach anywhere else &mdash; hard work, responsibility, patience, and the satisfaction of caring for something that depends on you. So they planted a seed. More cattle came, more fences went up, and little by little, the ranch began to take shape. Byron&rsquo;s love for the land and the cowboy way of life became contagious. Logan caught it.</p><p>Years later, as Logan and Ashley began raising a family of their own, that seed began to grow in a new direction. They wondered, what if we opened the gates and let other people experience this too? Trail rides followed, and what had begun as a place for one family to raise their kids became a place where other families could slow down, reconnect, and experience something real. Their daughter Kaleigh and her husband, Ryan, eventually moved their young family from Georgia to Kansas to become part of what God was building here. Today, Diamond Springs Ranch is still a real, working family ranch &mdash; built one fence, one horse, one idea, and one leap of faith at a time.</p><p>We believe there&rsquo;s something about getting away from the screens, schedules, concrete and noise that gives you room to remember what matters. Maybe you reconnect with someone you love. Maybe you hear God a little more clearly. Maybe you remember a dream you&rsquo;ve been too busy or afraid to pursue. Diamond Springs Ranch started as a seed, and maybe your time here will remind you of one you&rsquo;re supposed to plant. That&rsquo;s why we open the gates. From our family to yours, welcome to Diamond Springs Ranch.</p>',
  trustItems: [
    { icon: '&#x2B50;', text: '4.9 Stars &mdash; 281 Google Reviews' },
    { icon: '&#x1F40E;', text: 'Guided Horseback Rides' },
    { icon: '&#x1F333;', text: 'Luxury Treehouse Stay' },
    { icon: '&#x1F404;', text: 'Highland Cattle Herd' },
    { icon: '&#x2714;', text: 'All Activities by Reservation' },
  ],
  stats: [
    { value: '4.9', suffix: '', label: 'Google Star Rating' },
    { value: '281', suffix: '+', label: 'Reviews' },
    { value: '15', suffix: ' min', label: 'From Wichita' },
    { value: '6', suffix: '', label: 'Unique Experiences' },
  ],
};

// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// REVIEWS â€” fetched via fetch-reviews.js from Google Maps link
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
let REVIEWS = [];
try {
  const _rv = require('./data/reviews.json');
  if (_rv.reviews && _rv.reviews.length > 0) REVIEWS = _rv.reviews;
} catch(e) {}

// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// DIFFERENTIATORS
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
const DIFFERENTIATORS = [
  {
    heading: 'We&rsquo;re not selling rides. We&rsquo;re selling what you take home.',
    text: 'Other places sell horseback rides. We sell the conversation your kids have at the trailhead. The quiet moment on the ridge watching the sun go down over Kansas. The photo your family still talks about years later. Everything we do is built around helping people slow down and reconnect with what actually matters.'
  },
  {
    heading: 'This is a real working ranch.',
    text: 'The horses are in the pasture every morning. The Highland cattle are ours. The land is real. You&rsquo;re not visiting a theme park &mdash; you&rsquo;re coming onto a working property run by people who live this life every day, 15 minutes north of Wichita.'
  },
  {
    heading: 'There&rsquo;s nothing else like it near Wichita.',
    text: 'The treehouse in the cottonwoods and the covered wagon on the open pasture &mdash; there&rsquo;s genuinely nothing else like either of them in the area. Both are fully set up and completely private. People drive hours for this kind of thing, and you&rsquo;ve had it right in your backyard all along.'
  },
  {
    heading: 'Great for groups of all kinds.',
    text: 'Corporate retreats, church groups, family reunions, birthday parties, school field trips, scout troops &mdash; the ranch has the space and the setting to make any group event genuinely memorable. Get people off their phones and into something real.'
  },
];

// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// SERVICES â€” Experience categories for Diamond Springs Ranch
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
const SERVICES = [
  {
    slug:       'guided-horseback-rides',
    name:       'Guided Horseback Rides',
    heroBg:     '/images/trail_ride1.png',
    heroHeading: 'Where the <em>real</em> West still lives.',
    ctaLabel:   'Book a Trail Ride',
    shortDesc:  'Trail rides and riding lessons on a working Kansas ranch &mdash; 15 minutes north of Wichita.',
    icon:       '&#x1F40E;',
    costRange:  'Call for current pricing &mdash; (316) 303-6195',
    intro:      'Our horses aren&rsquo;t trailered in for the weekend. They live here. They know this land. That&rsquo;s the difference you feel from the first minute in the saddle. Guided trail rides, sunset rides, and lessons for all experience levels &mdash; all by reservation.',
    body:       '<p>Our horses aren&rsquo;t trailered in on weekends. They live here. They work this land every day &mdash; through the pastures, along the ridge, past the treehouse and the pond. When you come out for a trail ride, you feel that. There&rsquo;s a difference between a horse that&rsquo;s been in a field all week and a horse that actually knows the path.</p><p>We&rsquo;ve done over 1,000 safe rides. Five stars across hundreds of reviews. We do what we say we will do. That&rsquo;s not a marketing line &mdash; it&rsquo;s the standard we hold ourselves to every single time someone steps into our stirrups for the first time.</p><p>If you&rsquo;ve never ridden before, even better. First-timers are actually our favorite guests. You&rsquo;re not behind &mdash; you just haven&rsquo;t had the right place yet. We match every rider to the right horse, and our guides stay with you the entire time. No experience needed. No fear required. Just show up ready to slow down.</p><p>Everything is by reservation &mdash; call or text (316) 303-6195. We don&rsquo;t do walk-ins.</p><h2>What Makes Our Trail Rides Different?</h2><p>The guides who take you out on trail are the same people who feed and work these horses every morning. They know each horse by name, by personality, by quirk. That&rsquo;s not something you can fake or manufacture &mdash; it&rsquo;s just what happens when the horses actually belong to the people running the operation.</p><p>Lots of horse ranches are rude or make you feel like a tourist. That&rsquo;s not us. We are kind, respectful, and friendly to everyone. Beginner or expert rider alike. You&rsquo;ll feel that from the moment you pull in.</p><h2>Who Visits for Trail Rides?</h2><p>Families who want something real for their kids. Couples celebrating anniversaries. Nervous first-timers who almost didn&rsquo;t book and left saying it was the best thing they&rsquo;ve done in years. Groups looking for something that&rsquo;ll actually get people off their phones. That&rsquo;s who shows up out here &mdash; and that&rsquo;s exactly who we built this for.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch is at 1734 SE 96th St, Sedgwick, KS 67135 &mdash; 15 minutes north of Wichita, 2 miles off I-135. Fully insured Kansas agritourism operation. All activities are reservation-only.</p><h2>What Guests Say</h2><p>Over and over, people mention the same two things: the horses were calm and trustworthy, and the guides were the real deal &mdash; not performers, not tour operators, just people who love horses and love this land. &ldquo;The trail ride at sunset was one of the most beautiful things I&rsquo;ve done in Kansas. The horses knew the land and so did the guide.&rdquo; That&rsquo;s what we&rsquo;re going for every single time.</p><p>Explore more: <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> and <a href="/service-areas/">areas we serve</a>.</p>',
    metaDescription: 'Guided horseback rides &amp; riding lessons near Wichita at Diamond Springs Ranch, Sedgwick, KS. Real working ranch horses on open prairie. Call (316) 303-6195.',
    faqs: [
      { q: 'Do I need riding experience for a guided trail ride at Diamond Springs Ranch?', a: 'Not at all. We match horses to riders. Complete beginners ride with us all the time &mdash; our guides walk you through everything before you ever get in the saddle.' },
      { q: 'How long are the trail rides?', a: 'It depends on what you book. Call (316) 303-6195 and we&rsquo;ll talk through the options. Sunset rides are timed to the season.' },
      { q: 'What should I wear?', a: 'Closed-toe shoes or boots required. Long pants are a good idea. No flip-flops or open sandals &mdash; that&rsquo;s a safety thing. We provide everything else.' },
      { q: 'Can kids ride?', a: 'Yes. Kids ride with us regularly. Call ahead to confirm age and weight requirements &mdash; those vary depending on the horse and the type of ride.' },
      { q: 'Do you offer riding lessons?', a: 'Yes &mdash; lessons for beginners through intermediate riders, by reservation. Call (316) 303-6195 to set something up.' },
    ],
  },
  {
    slug:       'highland-cattle-experience',
    heroBg:     '/images/HighlandCattleExperience1.png',
    heroHeading: 'Meet the <em>herd.</em>',
    ctaLabel:   'Book the Ranch Corral',
    name:       'Highland Cattle Experience',
    shortDesc:  'Get up close with the ranch&rsquo;s Scottish Highland cattle herd &mdash; feed, brush, and photograph them.',
    icon:       '&#x1F404;',
    costRange:  'Call for current pricing &mdash; (316) 303-6195',
    intro:      'You don&rsquo;t see Highland cattle in Kansas. Long shaggy coats, sweeping horns, and a personality that&rsquo;s completely their own &mdash; our herd stops people in their tracks every time. The Ranch Corral Experience gets you in there with them. Hands-on, up-close, and unlike anything else available near Wichita.',
    body:       '<p>You don&rsquo;t see Scottish Highland cattle in Kansas. Long curved horns. Thick shaggy coats. A temperament that&rsquo;s genuinely calm &mdash; not because they&rsquo;re trained for performance, but because they&rsquo;re around people every single day. Our Highlands are part of the fabric of this ranch. They&rsquo;re not a petting zoo exhibit. They&rsquo;re ours.</p><p>When you get in there with them &mdash; feeding, brushing, photographing up close out in the open pasture &mdash; something happens that&rsquo;s hard to put into words. Kids who&rsquo;ve never been closer to a large animal than a fence find something out there that surprises them. Adults who came out for a trail ride call the cattle the highlight of the whole visit. That shows up in our reviews constantly. Honestly, this might be our most-photographed experience &mdash; and for good reason. The cattle stop people in their tracks every time.</p><p>We dehorn our Highlands, so they&rsquo;re as safe as they are striking. If you want a photo your family has never seen the likes of before, come meet ours.</p><h2>Who Books the Cattle Experience?</h2><p>Families, couples, church groups, school field trips, photography enthusiasts who hear about the Highlands and make the drive specifically for them. It&rsquo;s available standalone or paired with a morning trail ride for a full day on the ranch. Either way, call us at (316) 303-6195 to get it on the calendar.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135. Fifteen minutes north of Wichita, 2 miles off I-135. Fully insured, reservation-only.</p><p>More to explore: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> and <a href="/service-areas/">areas we serve</a>.</p>',
    metaDescription: 'Meet the Highland cattle herd at Diamond Springs Ranch near Wichita, KS. Feed, brush, and photograph them up close in Sedgwick, Kansas. Reservations required.',
    faqs: [
      { q: 'Are Highland cattle safe to approach?', a: 'They&rsquo;re known for being calm. Our herd is around people every day, so they&rsquo;re comfortable with guests. Our staff guides every encounter &mdash; you&rsquo;re always supervised.' },
      { q: 'Can kids do the cattle experience?', a: 'Yes, and they love it. It&rsquo;s one of the ranch experiences kids talk about long after they leave. Staff supervision throughout.' },
      { q: 'Is it available year-round?', a: 'Seasonal and by reservation. Call (316) 303-6195 to check availability for your date.' },
      { q: 'Can I take photos during the experience?', a: 'Absolutely. Bring your camera. The Highlands are probably the most photogenic animals on the property.' },
      { q: 'How long does it last?', a: 'Depends on the reservation. Call (316) 303-6195 and we&rsquo;ll walk you through the options and how to combine it with other activities.' },
    ],
  },
  {
    slug:       'luxury-treehouse-stay',
    heroBg:     '/images/LuxuryTreehouseStay1.png',
    heroHeading: 'Sleep among the <em>treeline.</em>',
    ctaLabel:   'Book the Treehouse',
    lodging:    true,
    lodgifyRentalId: '391057',
    lodgifyUrl:  'https://treelodges.lodgify.com/en/sunset-reset-treehouse',
    name:       'Luxury Treehouse Stay',
    shortDesc:  'Spend the night in the Sunset Reset Treehouse &mdash; fully equipped, completely private, unlike anything else near Wichita.',
    icon:       '&#x1F333;',
    costRange:  'Call for current nightly rates &mdash; (316) 303-6195',
    intro:      'The Sunset Reset Treehouse is perched in a stand of cottonwoods on the open ranch property. Fully set up, completely private, and genuinely unlike anything else available for an overnight stay near Wichita. We built it ourselves. The guestbook is full of handwritten notes from people who can&rsquo;t find the words to describe it on a review site.',
    body:       '<p>We built the Sunset Reset Treehouse to create a place where people could slow down.</p><p>Nestled among the trees on our working Kansas ranch, the treehouse feels tucked away from the world while still being just fifteen minutes north of Wichita. Step onto the wraparound deck and you&rsquo;ll find prairie views, cattle and horses in the pasture, Kansas sunsets through the trees, and a spring-fed pond nearby. At night, things get quiet enough to hear the sounds of the ranch around you.</p><p>The treehouse was designed with the help of a producer from Treehouse Masters and built by us, right here on the ranch. But what makes it special isn&rsquo;t the treehouse itself. It&rsquo;s what seems to happen when people stay here.</p><p>Couples slow down enough to really talk again. Families put away the screens and make memories their kids keep talking about. Anniversary guests arrive for a night away and leave wishing they had booked another.</p><p>That&rsquo;s exactly what we hoped for when we built it.</p><p>Not luxury for luxury&rsquo;s sake. Not just another place to stay. A chance to step away from the noise, reconnect with the people you love, and remember what matters.</p><p>Fifteen minutes from the city. A world away from the pace of it.</p><p>Come experience your own Sunset Reset.</p><h2>Booking the Treehouse</h2><p>All stays are by reservation. Make your time at the ranch more than just an overnight by adding a trail ride, a Highland cattle experience, or our Dinner Date Experience. Whether you&rsquo;re planning a romantic getaway, a family adventure, or simply a chance to slow down for a while, build your stay around the experience you&rsquo;re looking for.</p><p>More to explore: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> and <a href="/service-areas/">areas we serve</a>.</p>',
    metaDescription: 'Luxury treehouse overnight stay at Diamond Springs Ranch near Wichita, KS. Private, fully equipped, one-of-a-kind in Sedgwick, Kansas. Book at (316) 303-6195.',
    faqs: [
      { q: 'What&rsquo;s included in the treehouse stay?', a: 'It&rsquo;s fully set up for a comfortable overnight. Call (316) 303-6195 for the specifics &mdash; amenities get updated and we&rsquo;d rather tell you directly than have you read something outdated.' },
      { q: 'How far is the ranch from Wichita?', a: 'About 15 minutes north on US-81. Address is 1734 SE 96th St, Sedgwick, KS 67135.' },
      { q: 'Is it good for couples?', a: 'It&rsquo;s probably the most popular anniversary booking we have. Private, quiet, open Kansas sky. Completely different from any hotel stay.' },
      { q: 'Can I add ranch activities to the overnight?', a: 'Yes &mdash; most guests do. Morning trail ride, cattle encounter, dinner date, bonfire. Just mention what you&rsquo;re interested in when you call.' },
      { q: 'Is it available in winter?', a: 'It varies. Call (316) 303-6195 to check. We&rsquo;re open during select periods in the off-season.' },
    ],
  },
  {
    slug:       'covered-wagon-stay',
    heroHeading: 'Sleep under a <em>Kansas sky.</em>',
    ctaLabel:   'Book the Wagon',
    lodging:    true,
    lodgifyRentalId: '687675',
    lodgifyUrl:  'https://treelodges.lodgify.com/en/sunset-schooner',
    heroBg:     '/images/Covered_Wagon_Stay1.png',
    name:       'Covered Wagon Stay',
    shortDesc:  'Experience the romance of the Old West in a covered wagon tucked beneath the trees on our working Kansas ranch &mdash; with the comforts you&rsquo;d rather not leave behind.',
    icon:       '&#x1F6FA;',
    costRange:  'Call for current nightly rates &mdash; (316) 303-6195',
    intro:      'Experience the romance of the Old West in a covered wagon tucked beneath the trees on our working Kansas ranch &mdash; with the comforts you&rsquo;d rather not leave behind.',

    body:       '<p>We built the Sunset Schooner for people who want something real &mdash; pioneer spirit without the hardship. It sits out on the open pasture, west-facing, with an elevated deck built specifically for watching the Kansas sunset do its thing. There&rsquo;s a grill, a fire pit, a private bath, a real bed. A/C and heat so you can sleep. Glamping with grit, not gimmicks.</p><p>Sleeps four. Families love it. Couples who want something different love it. Kids who&rsquo;ve read about covered wagons their whole life discover that the real thing &mdash; done right &mdash; is better than anything in the books. The night sky out here is a different animal than what you see in Wichita. Wide open, uninterrupted, the kind that makes you realize how long it&rsquo;s been since you actually looked up.</p><p>This is what we mean when we say we want people to slow down. Come back to the cowboy way of life when everything was much slower. The Schooner is the most direct way to experience that. You park the car, you&rsquo;re done. Whatever you came out here carrying, the ranch has a way of setting it down for you.</p><p>Spring and fall fill up fast. If you have a specific date in mind, call ahead &mdash; (316) 303-6195. Most guests pair the wagon with a morning trail ride or an evening bonfire. We&rsquo;ll build the whole stay around what you&rsquo;re going for.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135. Fifteen minutes north of Wichita, 2 miles off I-135. Fully insured, reservation-only.</p><p>More to explore: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/private-events/">Private Events</a>, <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> and <a href="/service-areas/">areas we serve</a>.</p>',
    metaDescription: 'Covered wagon overnight stay at Diamond Springs Ranch near Wichita, KS. A one-of-a-kind Western overnight in Sedgwick, Kansas. Book at (316) 303-6195.',
    faqs: [
      { q: 'What&rsquo;s included in the covered wagon stay?', a: 'The wagon is fully set up for overnight. Call (316) 303-6195 for the specifics &mdash; we&rsquo;d rather tell you directly.' },
      { q: 'Is it actually comfortable?', a: 'Yes. This isn&rsquo;t roughing it. People consistently say it&rsquo;s one of the best nights they&rsquo;ve had in Kansas. The experience is real; the comfort is real too.' },
      { q: 'Good for families with kids?', a: 'Yes. Families book it regularly. It&rsquo;s one of those experiences kids will bring up for years.' },
      { q: 'Can I add trail rides or a bonfire?', a: 'Absolutely. Most guests do. Call (316) 303-6195 and we&rsquo;ll put together whatever combination works for you.' },
      { q: 'How far in advance should I book?', a: 'Spring and fall weekends book fast. A few weeks out minimum for those months. Call (316) 303-6195 to check what&rsquo;s open.' },
    ],
  },
  {
    slug:       'private-events',
    heroBg:     '/images/The_House_at_Night2.png',
    heroHeading: 'Bring your <em>whole group.</em>',
    ctaLabel:   'Inquire About Events',
    name:       'Private Events &amp; Rentals',
    shortDesc:  'Corporate retreats, family reunions, birthday parties, and group events on the ranch.',
    icon:       '&#x1F37E;',
    costRange:  'Call for custom event pricing &mdash; (316) 303-6195',
    intro:      'The ranch isn&rsquo;t a hotel ballroom. It&rsquo;s open land, working horses, Highland cattle, the Rusty Saddle Bar, and a setting that gets people off their phones and into the moment. Corporate retreats, family reunions, birthday parties, church groups, school field trips, scout troops &mdash; we&rsquo;ve hosted all of it, and the ranch setting makes every one of them better than it would have been anywhere else.',
    body:       '<p>There&rsquo;s something about this land that changes people. Put a group of people on a real working ranch &mdash; horses in the pasture, Highlands out in the field, forty acres of open Kansas country &mdash; and something shifts. The phones go away. The conversation comes back. People actually look at each other. We&rsquo;ve watched it happen with corporate teams, family reunions, church groups, and birthday gatherings, and it never gets old.</p><p>Our hope is that every group that comes out here would find the space they came for &mdash; whether that&rsquo;s a genuine team reset, a celebration worth remembering, or just a day away from the routine. The ranch is built for that. The 6,000-square-foot lodge holds up to 300 outdoors and 150 inside. The Rusty Saddle Bar is on site. The trail string is available. And we handle everything from small groups to full-property buyouts.</p><h2>Corporate Retreats and Team-Building</h2><p>Getting your team off-site onto a real working ranch changes the dynamic. We&rsquo;ve hosted medical practices, agriculture companies, professional services firms, and logistics teams from across the Wichita metro &mdash; and several come back every year because of what the ranch setting does for their people. Groups from 8 to 60+ for team days; full-property rental for larger gatherings. Call (316) 303-6195 and we&rsquo;ll talk through what you need.</p><h2>Groups, Gatherings, and Everything Else</h2><p>Church groups, school field trips, scout troops, family reunions, birthday parties, photography sessions &mdash; the ranch has the space, the setting, and the staff to make it work. Peak months fill up early. Off-season dates are usually available on shorter notice. Either way, call us first &mdash; (316) 303-6195. We&rsquo;ll find what fits.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135 &mdash; fifteen minutes north of Wichita, 2 miles off I-135. Fully insured, reservation-only.</p><p>More to explore: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> and <a href="/service-areas/">areas we serve</a>.</p>',
    metaDescription: 'Private ranch events near Wichita &mdash; corporate retreats, family reunions, birthday parties at Diamond Springs Ranch in Sedgwick, KS. Call (316) 303-6195.',
    faqs: [
      { q: 'What kinds of events do you host?', a: 'Corporate retreats, team-building, family reunions, birthday parties, church groups, school field trips, scout groups, company picnics, and photography sessions. Call to talk through your specific event.'},
      { q: 'How many people can you accommodate?', a: 'Depends on the event. Call (316) 303-6195 and we can talk through your group size and what setup works best.' },
      { q: 'Do you host corporate retreats near Wichita?', a: 'Yes. Corporate teams make up a solid part of our events calendar. The ranch setting creates a different dynamic than any conference room. Call (316) 303-6195.' },
      { q: 'Can we do a bonfire or s&rsquo;mores night?', a: 'Yes. Bonfire nights are available as part of private events and overnight stays. We also do seasonal live music events. Ask when you call.' },
    ],
  },
  {
    slug:       'dinner-date-experience',
    heroBg:     '/images/dinner-date-experience1.png',
    heroHeading: 'The most unforgettable <em>date night</em> in Kansas.',
    ctaLabel:   'Book the Dinner Date',
    name:       'Dinner Date Experience',
    shortDesc:  'A private evening at the ranch &mdash; the most unique dinner date near Wichita.',
    icon:       '&#x2665;',
    costRange:  'Call for current pricing &mdash; (316) 303-6195',
    intro:      'A table at a restaurant is fine. A private evening on a working Kansas ranch at dusk &mdash; horses in the pasture, Highlands visible across the land, the Sedgwick County sky going gold &mdash; that&rsquo;s something else. The Dinner Date Experience is our most popular special occasion booking for a reason.',
    body:       '<p>A table at a restaurant is fine. A private evening on a working Kansas ranch as the sun drops behind the pasture &mdash; horses visible from the table, the Highlands moving through the field, the Sedgwick County sky going gold &mdash; that&rsquo;s something else entirely. We built the Dinner Date Experience for the couples who want more than dinner. They want a moment that actually sticks.</p><p>We started Diamond Springs Ranch so people could slow down. That&rsquo;s what the Dinner Date does better than anything else we offer. No screens pulling you away. No noise from the table next to you. Just the two of you, this land, and an evening that reminds you what presence actually feels like.</p><p>You ride at sunset. You come back to a private dinner. There&rsquo;s a fire. The Rusty Saddle Bar is on site. And if you want to make a full weekend of it, we can pair the dinner date with a night in the treehouse or the covered wagon &mdash; one phone call and we&rsquo;ll build the whole thing around you.</p><h2>Booking the Dinner Date</h2><p>By reservation only &mdash; call or text (316) 303-6195. Spring and fall weekends fill up fast. If you&rsquo;re planning for an anniversary, Valentine&rsquo;s Day, or a milestone, don&rsquo;t wait. Call ahead, tell us what you&rsquo;re going for, and we&rsquo;ll take it from there.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135. Fifteen minutes north of Wichita. Fully insured, reservation-only. From our family to yours.</p><p>More to explore: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>. See all <a href="/services/">ranch experiences</a> and <a href="/service-areas/">areas we serve</a>.</p>',
    metaDescription: 'Dinner date experience at Diamond Springs Ranch near Wichita, KS. A unique private evening on a working Kansas ranch in Sedgwick. Call (316) 303-6195.',
    faqs: [
      { q: 'What is the Dinner Date Experience?', a: 'A private evening at the ranch combining the setting, the animals, and a dining experience that doesn&rsquo;t exist at any restaurant near Wichita. Call (316) 303-6195 for current details and pricing.' },
      { q: 'Is it good for anniversaries?', a: 'It&rsquo;s our most popular anniversary booking. Open Kansas land, working horses, the quiet of the property at dusk &mdash; it&rsquo;s unlike anything at a restaurant.' },
      { q: 'How far out should I book?', a: 'Weekend dates book fast in spring and fall. At least 2&ndash;3 weeks out is smart for weekend evenings. Call (316) 303-6195 to check availability.' },
      { q: 'Can I combine it with an overnight stay?', a: 'Yes &mdash; pairing the Dinner Date with the treehouse or covered wagon is one of our most popular combinations. Call and we&rsquo;ll put it together.' },
      { q: 'Is it available year-round?', a: 'It varies by season. Call (316) 303-6195 to check what&rsquo;s available for your time of year.' },
    ],
  },

  {
    slug:       'riding-lessons',
    heroHeading: 'Learn to ride the <em>right way.</em>',
    ctaLabel:   'Book a Lesson',
    name:       'Horseback Riding Lessons',
    shortDesc:  'Private and group lessons for all ages. Clinton Anderson Down Under Horsemanship method.',
    icon:       '&#x1F40E;',
    costRange:  'Call for current pricing &mdash; (316) 303-6195',
    photo:      '/images/photo-riding-lessons.jpg',
    heroBg:     '/images/Riding_Lessons1.png',
    intro:      'Learning to ride the right way means learning with a horse that respects you and a method that sticks. We use Clinton Anderson&rsquo;s Down Under Horsemanship approach &mdash; built on clear communication, partnership, and mutual respect between horse and rider.',
    body:       '<p>There&rsquo;s a right way and a wrong way to learn to ride. The wrong way is getting thrown on a horse and hoping for the best. The right way is what we do here: Clinton Anderson&rsquo;s Down Under Horsemanship method, which teaches you how to communicate with a horse before you ever get in the saddle.</p><p>It&rsquo;s not just about staying on. It&rsquo;s about understanding what the horse is telling you, and knowing how to respond. That foundation changes everything &mdash; your safety, your confidence, your relationship with the horse, and how far you can go as a rider.</p><p>We offer private and group lessons for all ages and experience levels. First-timers are welcome. Returning riders who want to fix bad habits are welcome. Kids who&rsquo;ve been asking their parents for lessons since they could talk are especially welcome.</p><h2>Who Are Lessons For?</h2><p>Anyone who wants to ride well, not just ride. We&rsquo;ve worked with complete beginners who&rsquo;d never touched a horse, intermediate riders who picked up bad habits somewhere along the way, and young riders whose parents want them to learn properly from the start. The method works at every level.</p><h2>What to Expect</h2><p>You&rsquo;ll work on ground exercises first &mdash; desensitizing, yielding, building respect and communication. Then we move to mounted work at whatever pace fits where you are. By the end of your first lesson, you&rsquo;ll feel a difference. By the end of a series, you&rsquo;ll be a different rider.</p><h2>Booking</h2><p>Private and group slots available. By reservation only &mdash; call or text (316) 303-6195. We&rsquo;ll match you with the right horse and the right instructor based on your goals and experience level.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135. About 15 minutes north of Wichita, 2 miles off I-135. Fully insured, reservation-only.</p><p>More to explore: <a href="/guided-horseback-rides/">Trail Rides</a>, <a href="/horse-day-camp/">Horse Day Camp</a>, <a href="/highland-cattle-experience/">Ranch Corral Experience</a>, <a href="/private-events/">Private Events</a>. See all <a href="/services/">ranch experiences</a>.</p>',
    metaDescription: 'Horseback riding lessons near Wichita, KS at Diamond Springs Ranch. Private and group lessons for all ages using Clinton Anderson Down Under Horsemanship. Call (316) 303-6195.',
    faqs: [
      { q: 'What riding method do you use?', a: 'Clinton Anderson&rsquo;s Down Under Horsemanship &mdash; a ground-up approach focused on respect, communication, and partnership between horse and rider.' },
      { q: 'Do you offer lessons for kids?', a: 'Yes &mdash; we work with riders of all ages. Kids are some of our best students. We match them with the right horse for their size and confidence level.' },
      { q: 'Do I need any experience?', a: 'None at all. We start from the ground up regardless of experience level. Complete beginners are welcome and common.' },
      { q: 'How long are lessons?', a: 'Session length and structure depend on your goals. Call (316) 303-6195 and we&rsquo;ll talk through what makes sense for you.' },
      { q: 'How do I book?', a: 'By reservation only &mdash; call or text (316) 303-6195. Walk-ins are not available.' },
    ],
  },
  {
    slug:       'horse-day-camp',
    heroBg:     '/images/Horse_Day_Camp1.png',
    heroHeading: 'A full week on the ranch. <em>Memories for a lifetime.</em>',
    ctaLabel:   'Inquire About Camp',
    name:       'Horse Day Camp',
    shortDesc:  'Week-long hands-on horse camp for kids. Grooming, riding, ranch chores, and real ranch life.',
    icon:       '&#x1F3D5;',
    costRange:  'Call for current session dates &mdash; (316) 303-6195',
    photo:      '/images/photo-horse-day-camp.jpg',
    intro:      'A week on the ranch for kids who love horses. Not a theme park experience &mdash; real ranch work, real riding, real animals. Limited spots each session. Kids who come through camp leave different than when they arrived.',
    body:       '<p>Horse Day Camp isn&rsquo;t a drop-and-go activity. It&rsquo;s a full week on a working Kansas ranch where kids earn their way with the horses. Grooming, feeding, cleaning stalls, ground work, mounted riding &mdash; they do it all, every day, with horses that become familiar and comfortable by mid-week.</p><p>We modeled camp on the way ranch kids actually learn. Not from a PowerPoint or a demonstration from the fence. From doing. From getting in there and figuring it out alongside the animals. The kids who&rsquo;ve come through camp talk about it for years. Parents tell us it&rsquo;s the best week their kid had all summer. We believe them &mdash; because we see it happen every session.</p><p>Spots are limited intentionally. Small groups mean every camper gets real time with the horses and real attention from the instructors. This isn&rsquo;t a factory. It&rsquo;s the ranch &mdash; and the ranch has a way of getting in a kid&rsquo;s blood.</p><h2>What Campers Do</h2><p>Morning feeding and grooming. Ground work and desensitizing exercises. Mounted riding and trail work. Ranch chores alongside the working crew. Cattle encounters. Evening activities depending on the session. By the end of the week, campers aren&rsquo;t guests anymore &mdash; they&rsquo;re part of how the ranch runs each morning.</p><h2>Who Camp Is For</h2><p>Kids who love horses, kids who are curious about ranch life, and kids who need a week away from screens and in the open air. Prior riding experience is helpful but not required. We meet every camper where they are.</p><h2>Booking</h2><p>Sessions are limited and fill up early. Call (316) 303-6195 to get on the list or check upcoming session dates. Do not wait if summer camp is on your list &mdash; spots go fast once dates are announced.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135. About 15 minutes north of Wichita, 2 miles off I-135.</p><p>More to explore: <a href="/riding-lessons/">Riding Lessons</a>, <a href="/guided-horseback-rides/">Trail Rides</a>, <a href="/highland-cattle-experience/">Ranch Corral Experience</a>, <a href="/private-events/">Private Events</a>. See all <a href="/services/">ranch experiences</a>.</p>',
    metaDescription: 'Horse Day Camp near Wichita, KS at Diamond Springs Ranch. Week-long hands-on horse camp for kids &mdash; grooming, riding, ranch chores, real ranch life. Call (316) 303-6195.',
    faqs: [
      { q: 'What age range is camp for?', a: 'Camp is designed for school-age kids. Call (316) 303-6195 and we&rsquo;ll let you know if your child&rsquo;s age is a good fit for the current session structure.' },
      { q: 'Does my child need riding experience?', a: 'Not required &mdash; we meet every camper where they are. Kids with zero experience and kids who&rsquo;ve ridden for years both get value from the week.' },
      { q: 'How many spots are available per session?', a: 'Spots are limited intentionally to keep the ratio of kids to instructors and horses real. Call early &mdash; (316) 303-6195.' },
      { q: 'What does a typical camp day look like?', a: 'Morning feeding and grooming, ground work, mounted riding, ranch chores, cattle encounters, and more depending on the session. Every day on the ranch is a little different.' },
      { q: 'When do sessions run?', a: 'Primarily summer. Call (316) 303-6195 for current session dates and availability.' },
    ],
  },
  {
    slug:       'rusty-saddle-bar',
    heroHeading: 'Cold drinks. Warm fire. <em>The Rusty Saddle Bar.</em>',
    ctaLabel:   'Contact Us',
    name:       'Rusty Saddle Bar',
    shortDesc:  'On-site bar for private events, group bookings, and special experiences at Diamond Springs Ranch.',
    icon:       '&#x1F37A;',
    costRange:  'Available with private events &mdash; call (316) 303-6195',
    photo:      '/images/photo-rusty-saddle-bar.jpg',
    heroBg:     '/images/Screenshot_2026-08-27_144747.png',
    intro:      'The Rusty Saddle Bar is the on-site bar at Diamond Springs Ranch &mdash; available for private events, group bookings, and special experiences. It&rsquo;s part of what makes the ranch the right venue for events that need something more than a ballroom.',
    body:       '<p>The Rusty Saddle Bar is built into the fabric of the ranch. Not a pop-up. Not a rental tent with a bar table. A real on-site bar that brings the ranch atmosphere into every private event, corporate retreat, and group gathering we host.</p><p>Cold drinks, warm fires, open land &mdash; there&rsquo;s nothing like it near Wichita. If you&rsquo;re planning a corporate event, a private party, a wedding reception, or any group gathering and you want the full ranch experience, the Rusty Saddle is part of it.</p><p>The bar is available exclusively through private event booking &mdash; not as a standalone walk-in service. Everything at Diamond Springs Ranch is by reservation, and the Rusty Saddle Bar is no different.</p><h2>Private Events at the Ranch</h2><p>The Rusty Saddle Bar pairs with our full private event offering: the 6,000-square-foot lodge (up to 300 outdoor, 150 indoor), the trail string, the Highland cattle, and forty acres of open Kansas ranch land. If you&rsquo;re looking for a venue that gets people off their phones and into the moment, this is it.</p><p>Corporate retreats, birthday parties, family reunions, church events, wedding receptions &mdash; we&rsquo;ve hosted all of it. Call (316) 303-6195 and talk to us about what you have in mind. We&rsquo;ll build the event around you.</p><h2>Where Are We?</h2><p>Diamond Springs Ranch, 1734 SE 96th St, Sedgwick, KS 67135. About 15 minutes north of Wichita, 2 miles off I-135.</p><p>More to explore: <a href="/private-events/">Private Events</a>, <a href="/guided-horseback-rides/">Trail Rides</a>, <a href="/highland-cattle-experience/">Ranch Corral Experience</a>, <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a>.</p>',
    metaDescription: 'The Rusty Saddle Bar at Diamond Springs Ranch near Wichita, KS. On-site bar available for private events, corporate retreats, and group bookings. Call (316) 303-6195.',
    faqs: [
      { q: 'Is the Rusty Saddle Bar open to the public?', a: 'The bar is available through private event bookings &mdash; not as a standalone walk-in bar. Call (316) 303-6195 to discuss your event.' },
      { q: 'Can I book the Rusty Saddle Bar for a corporate event?', a: 'Yes &mdash; it&rsquo;s part of our private event offering. The full ranch is available including the lodge, the trail string, and the bar. Call (316) 303-6195.' },
      { q: 'How do I add the Rusty Saddle Bar to my event?', a: 'It&rsquo;s part of private event booking. Call (316) 303-6195 and we&rsquo;ll build the event package around your needs.' },
    ],
  },];

// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// CITIES â€” Wichita metro and surrounding areas that send guests
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
const CITIES = [
  {
    slug:        'wichita-ks',
    name:        'Wichita',
    state:       'KS',
    zip:         '67202',
    lat:          37.6872,
    lng:         -97.3301,
    intro:       'Diamond Springs Ranch is about 15 minutes north of Wichita &mdash; the closest working ranch with horseback rides, Highland cattle, treehouse stays, and private event rental in the area. Most Wichita guests are here in 25 minutes.',
    metaDescription: 'Horseback rides, treehouse stays and Highland cattle at Diamond Springs Ranch. 15 minutes north of Wichita in Sedgwick, KS. Book your experience today.',
    body:        '<p>We&rsquo;re 15 minutes north of Wichita at 1734 SE 96th St in Sedgwick &mdash; a 25-minute drive from most Wichita neighborhoods. For Wichita families, it&rsquo;s the closest place in the area to ride horses on open ranch land, get up close with Highland cattle, or spend the night in a treehouse on the open prairie.</p><p>Wichita is a big city. It&rsquo;s easy to get disconnected from the outdoors, from the land, from each other. That&rsquo;s exactly the gap we&rsquo;re filling. Real horses. Real cattle. Real open land &mdash; 15 minutes from anywhere in Wichita.</p><p>Corporate teams use the ranch for retreats. Families come for birthday parties, church outings, and school field trips. Couples from College Hill and Riverside drive up for anniversary rides and treehouse stays. We hold a 4.9-star Google rating across 281 reviews.</p><h2>Why Do Wichita Residents Choose Diamond Springs Ranch?</h2><p>We&rsquo;re the only working ranch within 30 minutes of Wichita offering horseback rides, Highland cattle encounters, treehouse and wagon overnight stays, and full private event rental. 4.9 stars across 281+ Google reviews. The difference from a resort-style attraction is that this is a genuine working ranch. The horses and cattle are here every day. Every experience is led by people who know this land.</p><h2>What Is Diamond Springs Ranch?</h2><p>Diamond Springs Ranch is at 1734 SE 96th St, Sedgwick, KS 67135. Fully insured, registered Kansas agritourism operation. All experiences are by reservation only. Call (316) 303-6195 or email susan@susanschrag.com.</p><h2>Book from Wichita</h2><p>All by reservation: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, and <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> or call (316) 303-6195.</p>',
    localContext: 'Diamond Springs Ranch is 15 minutes north of Wichita via US-81. Wichita families, couples, and corporate groups make the short drive for horseback rides, overnight stays, and private events.',
    neighborhoods: ['College Hill', 'Riverside', 'Delano', 'Crown Heights', 'Eastborough', 'Woodlawn', 'Maize', 'Bel Aire', 'Old Town', 'North Riverside'],
    faqs: [
      { q: 'How far is Diamond Springs Ranch from Wichita?', a: 'About 15 minutes north on US-81 &mdash; 1734 SE 96th St, Sedgwick, KS. Most Wichita addresses reach us in 25 minutes.' },
      { q: 'Which Wichita neighborhoods visit most?', a: 'College Hill, Riverside, Delano, Crown Heights, Eastborough, Woodlawn, Maize, and Bel Aire all send regular guests. We&rsquo;re accessible from anywhere in Wichita in under 35 minutes.' },
      { q: 'Can Wichita companies use the ranch for corporate retreats?', a: 'Yes &mdash; corporate retreats and team-building from Wichita businesses are a regular part of our calendar. Open land, shared activities, no conference room energy. Call (316) 303-6195.' },
      { q: 'Do you host Wichita family birthday parties?', a: 'Yes. Birthday parties, family reunions, and group outings from Wichita are booked regularly. Works for all ages.' },
      { q: 'Best time of year to visit?', a: 'Spring and fall are the most popular &mdash; great weather for rides and outdoor experiences. Summer brings horse camps and evening events. Winter varies; call (316) 303-6195 to check.' },
    ],
  },
  {
    slug:        'derby-ks',
    name:        'Derby',
    state:       'KS',
    zip:         '67037',
    lat:          37.5476,
    lng:         -97.2689,
    intro:       'Diamond Springs Ranch is the closest working ranch to Derby, KS &mdash; about 35 minutes north on US-81. Derby families book trail rides, Highland cattle experiences, treehouse stays, wagon overnights, and private events with us.',
    metaDescription: 'Ranch experiences for Derby, KS families at Diamond Springs Ranch in Sedgwick. Horseback rides, Highland cattle, treehouse stays. Call (316) 303-6195.',
    body:        '<p>Derby is about 35 minutes south of us via US-81 North &mdash; a straight shot. Families from South Derby, Derby Junction, Pleasant Valley, and Wheatland Estates make the drive for birthday parties, school group outings, and corporate team events.</p><p>We hold a 4.9-star Google rating across 281 reviews. Derby families who make the trip for the first time almost always leave already planning to come back. Families with kids especially &mdash; real animals, open land, and activities that don&rsquo;t involve a screen make a real impression.</p><h2>Why Do Derby Families Drive to Diamond Springs Ranch?</h2><p>Derby has Rock River Rapids and Chicken N Pickle. But there&rsquo;s no working ranch in Derby city limits. We&rsquo;re the closest horseback ride, Highland cattle encounter, and overnight stay experience to Derby &mdash; under 35 minutes north. 4.9 stars across 281+ verified reviews. We&rsquo;ve been welcoming South Derby families, McConnell AFB families, and Rock Road corridor residents for years.</p><h2>What Is Diamond Springs Ranch?</h2><p>1734 SE 96th St, Sedgwick, KS 67135. Fully insured, registered Kansas agritourism operation. All experiences by reservation. Call (316) 303-6195 or email susan@susanschrag.com.</p><h2>Book from Derby</h2><p>All by reservation: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, and <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> or call (316) 303-6195.</p>',
    localContext: 'Derby families looking for an outdoor experience north of Wichita regularly book Diamond Springs Ranch. About 35 minutes via US-81 North.',
    neighborhoods: ['South Derby', 'Derby Junction', 'Pleasant Valley', 'West Derby', 'Wheatland Estates', 'Derby Hills', 'Meadowlark Hills', 'Buckner Heights'],
    faqs: [
      { q: 'How far is Diamond Springs Ranch from Derby?', a: '1734 SE 96th St in Sedgwick &mdash; approximately 35&ndash;40 minutes north of Derby via US-81 North.' },
      { q: 'What can Derby families do at the ranch?', a: 'Trail rides, Highland cattle encounters, birthday events, family reunions. Treehouse and wagon stays for Derby couples.' },
      { q: 'Do you host Derby school groups and field trips?', a: 'Yes. Call (316) 303-6195 to plan a group visit.' },
      { q: 'Can Derby businesses use the ranch for team-building?', a: 'Yes. Call (316) 303-6195.' },
      { q: 'Is it worth the drive from Derby?', a: '281 Google reviews averaging 4.9 stars say yes. The 35-minute drive puts you on open Kansas ranch land you won&rsquo;t find any closer.' },
    ],
  },
  {
    slug:        'haysville-ks',
    name:        'Haysville',
    state:       'KS',
    zip:         '67060',
    lat:          37.5651,
    lng:         -97.3519,
    intro:       'Diamond Springs Ranch is 35 minutes north of Haysville on US-81 &mdash; the closest working ranch experience for southern Sedgwick County families. Horseback rides, Highland cattle, treehouse stays, and private events.',
    metaDescription: 'Ranch experiences for Haysville, KS families at Diamond Springs Ranch in Sedgwick. Horseback rides, Highland cattle, and more. Call (316) 303-6195.',
    body:        '<p>Haysville is about 35 minutes south of us via US-81 North. Families from South Haysville, the Lake Afton area, and the Clearwater Road corridor make the drive for trail rides, birthday outings, and anniversary experiences they can&rsquo;t find any closer to home.</p><p>Church and faith communities from Haysville use the ranch for outdoor retreats and summer programming. School groups come for field trips combining animal encounters with open-air learning.</p><h2>Why Do Haysville Residents Visit Diamond Springs Ranch?</h2><p>Haysville is a tight-knit community south of Wichita with no working ranch experiences nearby. We give Haysville families, school groups, and corporate teams access to real Kansas ranch life &mdash; horseback rides, Highland cattle, bonfire nights, treehouse stays, and full private event rental &mdash; in a 35-minute drive north.</p><h2>What Is Diamond Springs Ranch?</h2><p>1734 SE 96th St, Sedgwick, KS 67135. Fully insured, registered Kansas agritourism operation. All experiences by reservation. Call (316) 303-6195 or email susan@susanschrag.com.</p><h2>Book from Haysville</h2><p>All by reservation: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, and <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> or call (316) 303-6195.</p>',
    localContext: 'Haysville residents are about 35 minutes south of Diamond Springs Ranch via US-81. Church groups, school field trips, and family events from Haysville are a regular part of our schedule.',
    neighborhoods: ['South Haysville', 'Lake Afton Community', 'West Haysville', 'Haysville Crossing', 'South Seneca Corridor', 'Airport Road Area', 'Clearwater Road Corridor', 'Haysville Junction'],
    faqs: [
      { q: 'How far is Diamond Springs Ranch from Haysville?', a: '1734 SE 96th St in Sedgwick &mdash; approximately 35 minutes north via US-81 North.' },
      { q: 'Can Haysville church groups book the ranch?', a: 'Yes. Call (316) 303-6195.' },
      { q: 'Do you host Haysville school field trips?', a: 'Yes. Call (316) 303-6195 to discuss scheduling.' },
      { q: 'How do I get there from Haysville?', a: 'Head north on US-81 through Wichita, continue to Sedgwick. Address is 1734 SE 96th St, Sedgwick, KS 67135. About 35 minutes.' },
      { q: 'Good for families with young kids?', a: 'Yes &mdash; all ages. Young kids love the Highland cattle encounter and trail rides especially.' },
    ],
  },
  {
    slug:        'andover-ks',
    name:        'Andover',
    state:       'KS',
    zip:         '67002',
    lat:          37.6953,
    lng:         -97.1351,
    intro:       'Diamond Springs Ranch is about 35 minutes from Andover via US-54 and K-15 &mdash; the closest working ranch experience for east Wichita metro families and corporate teams.',
    metaDescription: 'Ranch experiences for Andover, KS families at Diamond Springs Ranch in Sedgwick, KS. Horseback rides, retreats, treehouse stays. Book today.',
    body:        '<p>Andover is about 30 miles east of us &mdash; a 35-minute drive via US-54 and K-15. Andover has grown fast as a community, but there&rsquo;s no working ranch in city limits. Families from Auburn Hills, Rolling Meadows, Tallgrass Estates, and the 21st Street corridor come to us for birthday parties, church outings, and anniversary experiences they can&rsquo;t find any closer.</p><p>Corporate teams from Andover&rsquo;s business corridor use the ranch for quarterly retreats. The private event rental includes the full ranch property &mdash; 30 minutes from east Wichita without highway traffic. Andover guests in our reviews consistently say the drive is worth every minute.</p><h2>Why Do Andover Families Visit Diamond Springs Ranch?</h2><p>Andover has great amenities. A working ranch with horseback rides, Highland cattle, and a treehouse overnight isn&rsquo;t among them. We&rsquo;re the closest place in the region for that combination &mdash; 4.9 stars across 281+ verified reviews, with Andover guests returning regularly over the years.</p><h2>What Is Diamond Springs Ranch?</h2><p>1734 SE 96th St, Sedgwick, KS 67135. Fully insured, registered Kansas agritourism operation. All experiences by reservation. Call (316) 303-6195 or email susan@susanschrag.com.</p><h2>Book from Andover</h2><p>All by reservation: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, and <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> or call (316) 303-6195.</p>',
    localContext: 'Andover is one of the fastest-growing communities in the Wichita metro. Families and corporate groups seeking genuine outdoor experiences book Diamond Springs Ranch, approximately 30 minutes west via US-54 / K-15.',
    neighborhoods: ['Auburn Hills', 'Rolling Meadows', 'Tallgrass Estates', 'Windmill Creek', 'Andover Trails', 'East Andover', 'College Hill East', 'Prairie Creek'],
    faqs: [
      { q: 'How far is Diamond Springs Ranch from Andover?', a: '1734 SE 96th St in Sedgwick &mdash; approximately 30 minutes west of Andover via US-54 West to US-81 North.' },
      { q: 'Can Andover businesses use the ranch for corporate retreats?', a: 'Yes. Call (316) 303-6195.' },
      { q: 'What&rsquo;s available for Andover families?', a: 'Horseback trail rides, Highland cattle encounters, birthday parties, and family reunions. Treehouse and wagon stays for couples.' },
      { q: 'Do you host Andover school and scout groups?', a: 'Yes. Call (316) 303-6195 to plan.' },
      { q: 'What makes it worth the drive from Andover?', a: 'A working ranch with horseback rides, Highland cattle, and a treehouse overnight doesn&rsquo;t exist any closer to Andover. 4.9 stars across 281 Google reviews.' },
    ],
  },
  {
    slug:        'newton-ks',
    name:        'Newton',
    state:       'KS',
    zip:         '67114',
    lat:          38.0467,
    lng:         -97.3453,
    intro:       'Diamond Springs Ranch is 12 miles south of Newton on US-81 &mdash; the shortest drive to a working ranch experience from Harvey County. Newton families, church groups, and Bethel College visitors book trail rides, treehouse stays, and private events with us.',
    metaDescription: 'Ranch experiences for Newton, KS at Diamond Springs Ranch in Sedgwick &mdash; just 12 miles south on US-81. Horseback rides, treehouse stays, and more.',
    body:        '<p>Newton is 12 miles north of us on US-81 &mdash; which makes Newton residents the closest community to Diamond Springs Ranch in the entire region. North Newton, Newton Junction, and the Hesston area can reach us in under 15 minutes. If you&rsquo;re in Newton and you&rsquo;ve never come out to the ranch, you&rsquo;re passing us on US-81.</p><p>Church groups and faith communities from Newton and Hesston book the ranch for outdoor retreats and group events. Newton families come for birthday outings, school field trips, and anniversary experiences. The short drive makes last-minute bookings easier for Newton residents than for anyone else we serve.</p><h2>Why Do Newton Families Visit Diamond Springs Ranch?</h2><p>Newton&rsquo;s Chisholm Trail heritage runs deep. The city was a major cattle-drive terminus in the 1870s &mdash; so a working ranch 12 miles south feels like home ground. We&rsquo;ve welcomed Newton families, Bethel College groups, and Harvey County residents for years. 4.9 stars across 281+ Google reviews.</p><h2>What Is Diamond Springs Ranch?</h2><p>1734 SE 96th St, Sedgwick, KS 67135. Fully insured, registered Kansas agritourism operation. All experiences by reservation. Call (316) 303-6195 or email susan@susanschrag.com.</p><h2>Book from Newton</h2><p>All by reservation: <a href="/guided-horseback-rides/">Guided Horseback Rides</a>, <a href="/highland-cattle-experience/">Highland Cattle Experience</a>, <a href="/luxury-treehouse-stay/">Luxury Treehouse Stay</a>, <a href="/covered-wagon-stay/">Covered Wagon Stay</a>, <a href="/private-events/">Private Events</a>, and <a href="/dinner-date-experience/">Dinner Date Experience</a>. See all <a href="/services/">ranch experiences</a> or call (316) 303-6195.</p>',
    localContext: 'Newton is 12 miles north of Diamond Springs Ranch on US-81 &mdash; the closest significant community to the property. Newton residents have the shortest drive of anyone in the region.',
    neighborhoods: ['North Newton', 'Newton Junction', 'Newton West', 'Harvey County East', 'Sedgwick Area', 'Walton Community', 'Burrton', 'Hesston'],
    faqs: [
      { q: 'How close is Diamond Springs Ranch to Newton?', a: 'About 12 miles south on US-81 &mdash; 1734 SE 96th St, Sedgwick, KS. Under 15 minutes from most Newton addresses.' },
      { q: 'Can Newton church groups book the ranch for retreats?', a: 'Yes. Call (316) 303-6195.' },
      { q: 'What&rsquo;s available for Newton families?', a: 'Trail rides, Highland cattle encounters, birthday parties, family reunion events. Treehouse and wagon stays for couples and families.' },
      { q: 'Can Newton residents make a last-minute reservation?', a: 'The proximity makes it more feasible than for most. Call or text (316) 303-6195 to check current availability.' },
      { q: 'Why is Diamond Springs Ranch the best option for Newton-area families?', a: 'At 12 miles away, you&rsquo;re the closest community to us. Short drive, working ranch, horseback rides, Highland cattle, the only luxury treehouse overnight in the area. 4.9 stars across 281+ Google reviews.' },
    ],
  },
];

// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
// SERVICE FAQS â€” general FAQs for the homepage / about page
// â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”â€”
const SERVICE_FAQS = [
  { q: 'Where is Diamond Springs Ranch?', a: 'At 1734 SE 96th St, Sedgwick, KS 67135 &mdash; about 15 minutes north of Wichita on US-81. Most Wichita addresses reach us in 25 minutes.' },
  { q: 'Do I need a reservation?', a: 'Yes &mdash; everything is by reservation. We don&rsquo;t do walk-ins. Call or text (316) 303-6195 to book.' },
  { q: 'What can I do at Diamond Springs Ranch?', a: 'Guided horseback trail rides, sunset rides, Highland cattle encounters, riding lessons, horse summer camps, luxury treehouse stays, covered wagon stays, private events (corporate retreats, family reunions, group outings), dinner date experiences, bonfires, and seasonal live music.' },
  { q: 'Is the ranch good for corporate team-building?', a: 'Yes &mdash; corporate retreats and team events are a regular part of our calendar. Getting a team on a working ranch changes the dynamic completely. Call (316) 303-6195 to discuss.' },
];

module.exports = { CLIENT, SERVICES, CITIES, REVIEWS, DIFFERENTIATORS, SERVICE_FAQS };








