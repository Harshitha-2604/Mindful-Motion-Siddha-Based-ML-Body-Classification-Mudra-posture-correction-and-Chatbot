const ChatbotModel = {
    mudras: {
        chin: { name: "Chin Mudra (Mudra of Consciousness)", description: "Touch the tip of your thumb to the tip of your index finger, keeping the other three fingers straight. This mudra enhances memory, concentration, and calms the mind.", image: "assets/images/chin_mudra.png" },
        apan: { name: "Apan Mudra (Mudra of Digestion)", description: "Join the tips of the thumb, middle finger, and ring finger, keeping the other two fingers straight. It helps in detoxification and regulates digestion and elimination.", image: "assets/images/apana_mudra.png" },
        pran: { name: "Prana Mudra (Mudra of Life)", description: "Touch the tip of the thumb with the tips of the ring finger and the little finger. This mudra improves vitality, reduces fatigue, and boosts the immune system.", image: "assets/images/prana_mudra.png" },
        neer: { name: "Neer Mudra (Mudra of Water)", description: "Touch the tip of the little finger with the tip of the thumb. It balances the water element in the body, helping with dryness, skin issues, and hydration.", image: "assets/images/neer_mudra.png" },
        man: { name: "Mann Mudra (Mudra of Mind)", description: "Place the index and middle fingers on the eyebrow center, close the right nostril with the thumb, and use the ring and little finger for the left nostril. This is part of Nadi Shodhana pranayama and brings mental peace.", image: "assets/images/mann_mudra.png" }
    },

    qaData: {
        generalTopics: [
            { 
                topic: "Understanding Body Types", 
                questions: [
                    { question: "Explain all body types.", keywords: ["explain", "body type", "dosha", "constitution"], answer: { text: "In Siddha, the three core constitutional types (Doshas) are Vata (Air/Space), Pitta (Fire/Water), and Kapha (Earth/Water).<br><b>Vata</b> governs movement and is light, dry, and cool. <br><b>Pitta</b> governs metabolism and is hot, sharp, and intense. <br><b>Kapha</b> governs structure and is heavy, cool, and stable. Most people are a combination of two, like Vata-Pitta." } }
                ]
            },
            { 
                topic: "About Siddha Medicine", 
                questions: [
                    { question: "What is Siddha medicine?", keywords: ["what is siddha", "siddha medicine"], answer: { text: "Siddha medicine is one of the oldest traditional medical systems in the world, originating in Southern India. It emphasizes balancing the three humors (Vata, Pitta, Kapha), the seven tissues (dhatus), and the waste products (malas) to achieve spiritual and physical well-being. It uses herbs, minerals, and lifestyle practices for healing." } },
                    { question: "What are Mudras?", keywords: ["mudra", "hand gesture"], answer: { text: "Mudras are symbolic hand gestures used in yoga and meditation. Each finger represents one of the five elements (pancha bhootas). By holding the fingers in specific positions, we can influence the flow of energy (prana) in the body to calm the mind, improve health, and deepen spiritual practice." } }
                ]
            },
            
            { 
                topic: "Mudras & Hand Gestures", 
                questions: [
                    { question: "Which mudra is good for improving memory and concentration?", keywords: ["memory", "concentration", "focus", "study", "brain"], answer: { text: "The Chin Mudra (Mudra of Consciousness) is excellent for enhancing memory and concentration. It helps calm the mind and improve mental clarity.", mudraKey: "chin" } },
                    { question: "What mudra helps with digestion and detoxification?", keywords: ["digestion", "detox", "detoxification", "stomach", "elimination"], answer: { text: "Apan Mudra (Mudra of Digestion) is very effective for regulating digestion and helping with detoxification processes in the body.", mudraKey: "apan" } },
                    { question: "Which mudra boosts energy and reduces fatigue?", keywords: ["energy", "fatigue", "tired", "vitality", "immune"], answer: { text: "Prana Mudra (Mudra of Life) helps improve vitality, reduce fatigue, and strengthen the immune system.", mudraKey: "pran" } },
                    { question: "What mudra balances water element and hydration?", keywords: ["water", "hydration", "dry skin", "dryness", "moisture"], answer: { text: "Neer Mudra (Mudra of Water) helps balance the water element in the body, addressing issues like dryness and skin problems.", mudraKey: "neer" } },
                    { question: "Which mudra brings mental peace and calms the mind?", keywords: ["mental peace", "calm mind", "anxiety", "stress relief", "nadi shodhana"], answer: { text: "Mann Mudra is excellent for mental peace and is used in Nadi Shodhana pranayama to calm the mind and reduce anxiety.", mudraKey: "man" } },
                    { question: "How do I perform Chin Mudra correctly?", keywords: ["how to chin mudra", "perform chin", "chin mudra technique"], answer: { text: "Touch the tip of your thumb to the tip of your index finger, keeping the other three fingers straight. Rest your hands on your knees with palms facing up during meditation.", mudraKey: "chin" } },
                    { question: "What is the proper way to do Apan Mudra?", keywords: ["how to apan mudra", "apan mudra technique", "perform apan"], answer: { text: "Join the tips of the thumb, middle finger, and ring finger together, keeping the index and little fingers straight. Practice for 15-45 minutes daily.", mudraKey: "apan" } },
                    { question: "When is the best time to practice mudras?", keywords: ["when practice mudras", "best time mudra", "mudra timing", "duration"], answer: { text: "Mudras can be practiced anytime, but morning meditation time is ideal. Most mudras should be practiced for 15-45 minutes daily for best results.", mudraKey: "chin" } },
                    { question: "Can I practice multiple mudras in one session?", keywords: ["multiple mudras", "combine mudras", "several mudras", "mudra sequence"], answer: { text: "Yes, you can practice different mudras for specific needs. Start with Prana Mudra for energy, then Chin Mudra for concentration, and end with Mann Mudra for peace.", mudraKey: "pran" } },
                    { question: "Which mudras are beneficial for Vata imbalance?", keywords: ["vata mudra", "mudra for vata", "vata balance mudra"], answer: { text: "For Vata imbalance, Chin Mudra helps calm the mind, Prana Mudra boosts energy, and Apan Mudra aids digestion. Regular practice helps ground Vata energy.", mudraKey: "chin" } },
                    { question: "Which mudras help with Pitta imbalance?", keywords: ["pitta mudra", "mudra for pitta", "pitta balance mudra"], answer: { text: "For Pitta imbalance, Neer Mudra cools the body, Mann Mudra calms intensity, and Chin Mudra helps reduce irritability and overheating.", mudraKey: "neer" } },
                    { question: "Which mudras are good for Kapha imbalance?", keywords: ["kapha mudra", "mudra for kapha", "kapha balance mudra"], answer: { text: "For Kapha imbalance, Prana Mudra increases energy, Apan Mudra stimulates digestion, and Chin Mudra helps overcome mental lethargy.", mudraKey: "pran" } }
                ]
            }
        ],

        vata: [
    { 
        topic: "Lifestyle & Philosophy", 
        questions: [
            { question: "What is the core principle of a Vata lifestyle?", keywords: ["core", "principle", "lifestyle", "philosophy"], answer: { text: "To balance Vata's mobile and cold nature, the core principle is 'Sthiratva' (stability) and 'Ushnata' (warmth). A consistent daily routine (Dinacharya) is your most powerful tool. Eat, sleep, and work at regular hours to ground your energy." } },
            { question: "What is an ideal daily schedule for me?", keywords: ["daily", "schedule", "routine", "plan"], answer: { text: "Wake by 6:30 AM. Perform a warm oil massage. Do gentle yoga or walk. Eat a warm breakfast by 8 AM. Have your main meal at noon. Wind down after 6 PM with light activities. Be in bed by 10 PM. Consistency is more important than rigidity." } },
            { question: "How can I create stability in my life?", keywords: ["stability", "grounding", "settle", "consistent"], answer: { text: "Establish fixed times for meals, sleep, and work. Create a calming environment with warm colors and soft lighting. Avoid excessive travel and sudden changes. Practice grounding activities like gardening or gentle walking in nature." } },
            { question: "What type of environment is best for Vata?", keywords: ["environment", "home", "space", "surroundings"], answer: { text: "Warm, moist, and quiet environments are ideal. Use humidifiers, warm lighting, and soft fabrics. Avoid cold, drafty, and noisy places. Create a cozy sanctuary with comfortable seating and calming elements." } },
            { question: "How important is sleep for Vata balance?", keywords: ["sleep", "rest", "bedtime", "insomnia"], answer: { text: "Sleep is crucial for Vata types. Aim for 7-8 hours of quality sleep. Establish a calming bedtime routine - warm milk with spices, light reading, and avoiding screens before bed. Go to bed by 10 PM when Kapha energy promotes deep rest." } }
        ]
    },
    { 
        topic: "Diet & Nutrition", 
        questions: [
            { question: "Which foods are good for me?", keywords: ["food", "good", "eat", "take", "diet", "nutrition", "meal"], answer: { text: "Favour warm, nourishing, and moist foods. Good choices include: well-cooked rice, oatmeal, baked sweet potatoes, mung beans, ghee, almonds, and warm milk. For fruits, choose sweet ones like bananas, avocados, and mangoes." } },
            { question: "Which foods should I reduce?", keywords: ["food", "reduce", "avoid", "bad", "stop eating"], answer: { text: "Reduce foods that are cold, dry, and light. This includes large raw salads, iced beverages, crackers, popcorn, dried fruits, and carbonated drinks. These aggravate Vata's qualities." } },
            { question: "What are the best tastes (Arusuvai) for Vata?", keywords: ["taste", "arusuvai", "flavor"], answer: { text: "You should favor the Sweet (Inippu), Sour (Pulippu), and Salty (Uppu) tastes as they are grounding and nourishing for Vata. Minimize Pungent, Bitter, and Astringent tastes." } },
            { question: "How should I cook my food?", keywords: ["cook", "cooking", "preparation", "recipes"], answer: { text: "Cook food thoroughly until soft and moist. Soups, stews, and one-pot meals are excellent. Use generous amounts of ghee or olive oil. Add warming spices like ginger, cinnamon, and cardamom. Avoid raw, frozen, or microwave foods." } },
            { question: "What are the best eating habits for Vata?", keywords: ["eating habits", "mealtime", "how to eat", "dining"], answer: { text: "Eat in a calm environment without distractions. Chew food thoroughly. Have three regular meals at the same time each day. Your largest meal should be at lunch when digestive fire is strongest. Avoid eating while standing or walking." } },
            { question: "Which spices help balance Vata?", keywords: ["spices", "herbs", "seasoning", "flavoring"], answer: { text: "Warming spices like ginger, cumin, fennel, cinnamon, cardamom, cloves, and black pepper are excellent. They kindle digestive fire without being too stimulating. Use fresh ginger in cooking and fennel seeds after meals for digestion." } }
        ]
    },
    { 
        topic: "Health Issues", 
        questions: [
            { question: "I have joint pain and stiffness. What can help?", keywords: ["joint", "pain", "stiff", "arthritis"], answer: { text: "This is a common Vata concern related to dryness. A daily self-massage (Abhyanga) with warm sesame oil, focusing on the joints, provides lubrication and relief. Internally, ensure you are well-hydrated with warm water.", mudraKey: "neer" } },
            { question: "My mind is always racing with anxiety. What is the Siddha approach?", keywords: ["mind", "racing", "anxiety", "stress", "worry"], answer: { text: "A racing mind is excess Vayu (air). Calm it with Nadi Shodhana (alternate nostril breathing). This practice balances the flow of prana in the body, bringing immediate mental peace and clarity.", mudraKey: "man" } },
            { question: "How can I improve my weak digestion and gas?", keywords: ["digestion", "gas", "bloat", "stomach"], answer: { text: "Your digestive fire (Agni) is variable. Kindle it gently with spices like ginger, cumin, and fennel. Sip warm ginger tea before meals. The Apan Mudra helps regulate downward energy flow, aiding elimination and relieving gas.", mudraKey: "apan" } },
            { question: "I suffer from constipation. What remedies help?", keywords: ["constipation", "bowel", "irregular", "elimination"], answer: { text: "Drink warm water throughout the day. Soak 2-3 dried figs overnight and eat them in the morning. Include ghee in your diet. Triphala tea at bedtime regulates bowel movements. Gentle abdominal massage in clockwise direction helps." } },
            { question: "How to deal with dry skin and hair?", keywords: ["dry skin", "dry hair", "flaky", "moisturize"], answer: { text: "Daily oil massage with warm sesame or almond oil. Drink warm water with lemon. Use natural moisturizers like coconut oil. Avoid harsh soaps and hot showers. Include healthy fats like ghee and avocado in your diet.", mudraKey: "neer" } },
            { question: "I have trouble sleeping. What natural remedies help?", keywords: ["insomnia", "sleepless", "restless", "can't sleep"], answer: { text: "Warm milk with nutmeg before bed. Foot massage with warm oil. Establish a regular sleep schedule. Avoid stimulating activities in the evening. Practice gentle yoga poses like legs-up-the-wall before bedtime." } },
            { question: "How to manage nervousness and fear?", keywords: ["nervous", "fear", "scared", "apprehensive"], answer: { text: "Grounding practices like walking barefoot on grass. Regular meditation with focus on the earth element. Warm, heavy foods provide stability. Avoid excessive stimulation and maintain a predictable routine for security." } }
        ]
    },
    { 
        topic: "Exercise & Energy", 
        questions: [
            { question: "What type and intensity of exercise is best?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness", "activity"], answer: { text: "Intensity should be low to moderate. Focus on slow, rhythmic, and strengthening movements. Excellent types are Hatha or restorative yoga, Tai Chi, walking, and light cycling. Avoid high-impact, fast-paced exercises that can cause exhaustion." } },
            { question: "I feel drained and low on energy. What can I do?", keywords: ["drained", "low energy", "tired", "fatigue"], answer: { text: "Prioritize rest. Vata types burn energy quickly. Short, mindful breaks during the day and ensuring you get 8 hours of sleep are vital for restoring your energy reserves. The Prana Mudra helps to build this vital life force.", mudraKey: "pran" } },
            { question: "When is the best time to exercise?", keywords: ["when exercise", "exercise timing", "morning workout", "evening exercise"], answer: { text: "Morning between 6-10 AM is ideal when Kapha energy provides stability. Avoid exercising during Vata time (2-6 PM) as it may increase instability. Never exercise on an empty stomach - have a light snack first." } },
            { question: "How long should my workouts be?", keywords: ["workout duration", "how long", "exercise length", "time"], answer: { text: "20-45 minutes maximum. Quality over quantity. Listen to your body - stop before exhaustion. Consistency is more important than intensity. Three to four times weekly is sufficient for maintenance." } },
            { question: "Which yoga poses are most beneficial?", keywords: ["yoga", "asanas", "poses", "postures"], answer: { text: "Grounding poses like Mountain, Tree, and Warrior. Forward bends calm the nervous system. Gentle twists aid digestion. Restorative poses like Child's pose and Corpse pose are essential. Avoid excessive backbends and inversions." } }
        ]
    },
    { 
        topic: "Mental Wellness", 
        questions: [
            { question: "How can I calm my mind for better focus?", keywords: ["calm", "mind", "focus", "concentrate"], answer: { text: "To tame the Vata mind, reduce sensory input. Practice mindfulness by focusing on a single task at a time. The Chin Mudra, the gesture of consciousness, is excellent for improving concentration and reducing mental chatter.", mudraKey: "chin" } },
            { question: "How to manage mood swings?", keywords: ["mood swings", "emotional", "unstable", "changeable"], answer: { text: "Establish strong daily routines. Regular meditation practice. Warm, nourishing foods stabilize emotions. Avoid overstimulation and maintain consistent sleep patterns. Journaling helps process fluctuating emotions." } },
            { question: "What meditation practices suit Vata?", keywords: ["meditation", "dhyana", "mindfulness", "contemplation"], answer: { text: "Guided meditation with grounding visualizations. Walking meditation in nature. Mantra repetition with mala beads. Avoid long silent sits - start with 10-15 minutes and gradually increase. Focus on stability and earth element." } },
            { question: "How to reduce mental clutter?", keywords: ["mental clutter", "overthinking", "too many thoughts", "scattered"], answer: { text: "Create to-do lists and prioritize tasks. Practice single-tasking instead of multitasking. Digital detox periods. Regular nature walks. Warm oil head massage (Shiro Abhyanga) calms the mind and nervous system.", mudraKey: "chin" } },
            { question: "What practices help with decision-making?", keywords: ["decisions", "indecisive", "choices", "confused"], answer: { text: "Ground yourself before important decisions. Practice deep breathing. Consult with stable people. Avoid making decisions when tired or hungry. Journal pros and cons. Trust your intuition after calming the mind." } }
        ]
    },
    { 
        topic: "Seasonal Care", 
        questions: [
            { question: "How should I care for myself in autumn?", keywords: ["autumn", "fall", "vata season", "windy season"], answer: { text: "Autumn is Vata season - increase grounding practices. More oil massage, warmer foods, and earlier bedtimes. Protect from wind and cold. Increase warm, moist foods and reduce raw foods. Practice more restorative yoga." } },
            { question: "What about winter care?", keywords: ["winter", "cold", "vata aggravating", "dry season"], answer: { text: "Winter aggravates Vata's cold and dry qualities. Stay warm with layered clothing. Increase healthy fats in diet. Warm oil massage daily. Steam inhalation helps with dryness. Maintain regular exercise routine indoors." } },
            { question: "How to transition between seasons?", keywords: ["seasonal transition", "weather change", "adapting", "adjusting"], answer: { text: "Start preparing 2 weeks before season change. Gradually adjust diet and routine. Cleanse gently with warm water and lemon. Increase self-care practices during transitions. Listen to your body's changing needs." } }
        ]
    }
],
        pitta: [
    { 
        topic: "Lifestyle & Philosophy", 
        questions: [
            { question: "What is the core principle of a Pitta lifestyle?", keywords: ["core", "principle", "lifestyle", "philosophy"], answer: { text: "To balance Pitta's hot and sharp nature, the core principle is 'Shitalatva' (coolness) and 'Mṛduta' (softness). Practice moderation in all activities, avoid conflict, and make time for leisure to cool your intensity." } },
            { question: "What is an ideal daily schedule for me?", keywords: ["daily", "schedule", "routine", "plan"], answer: { text: "Wake by 6 AM. Exercise during the cool morning hours. Have your main meal at noon when your digestive fire is strongest. Schedule challenging mental work in the morning. Dedicate evenings to relaxation and leisure. Be in bed by 10:30 PM." } },
            { question: "How can I create a cooling environment?", keywords: ["cooling", "environment", "home", "space", "surroundings"], answer: { text: "Use cool colors like blue, green, and white. Keep spaces well-ventilated. Use natural fabrics like cotton and silk. Have plants and water features. Avoid excessive heat sources and direct afternoon sun exposure." } },
            { question: "How to manage my competitive nature?", keywords: ["competitive", "driven", "intense", "ambitious"], answer: { text: "Channel competitiveness into self-improvement rather than comparison. Practice non-competitive activities like gardening or painting. Set process-oriented goals instead of outcome-focused ones. Learn to appreciate the journey." } },
            { question: "What relaxation techniques work best?", keywords: ["relaxation", "unwind", "de-stress", "calm down"], answer: { text: "Moon gazing, walking near water, listening to calming music, and progressive muscle relaxation. Avoid intense debates before bedtime. Practice 'doing nothing' without guilt to cool mental fire." } }
        ]
    },
    { 
        topic: "Diet & Nutrition", 
        questions: [
            { question: "Which foods are good for me?", keywords: ["food", "good", "eat", "take", "diet", "nutrition", "meal"], answer: { text: "Favour cooling, refreshing, and substantial foods. Good choices include: basmati rice, barley, cucumber, leafy greens, sweet fruits like melons and grapes, coconut, and sunflower seeds. Ghee is excellent in moderation." } },
            { question: "Which foods should I reduce?", keywords: ["food", "reduce", "avoid", "bad", "stop eating"], answer: { text: "Reduce foods that are hot, spicy, sour, and overly salty. This includes chili peppers, garlic, tomatoes, sour yogurt, vinegar, coffee, and alcohol. These ignite Pitta's fire." } },
            { question: "What are the best tastes (Arusuvai) for Pitta?", keywords: ["taste", "arusuvai", "flavor"], answer: { text: "You should favor the Sweet (Inippu), Bitter (Kasappu), and Astringent (Thuvarppu) tastes as they are cooling and pacifying for Pitta. Minimize Sour, Salty, and Pungent tastes." } },
            { question: "How should I prepare my meals?", keywords: ["cooking", "preparation", "recipes", "meal prep"], answer: { text: "Steaming, boiling, and sautéing with ghee are best. Avoid deep-frying and barbecuing. Use cooling herbs like mint, cilantro, and fennel. Cook with moderate spices rather than intense heating ones." } },
            { question: "What are ideal eating habits?", keywords: ["eating habits", "mealtime", "how to eat", "dining"], answer: { text: "Eat in a calm, cool environment. Chew slowly and mindfully. Never eat when angry or rushed. Your largest meal should be at noon. Avoid eating late at night. Stop when 75% full to prevent overheating digestion." } },
            { question: "Which beverages are cooling?", keywords: ["drinks", "beverages", "fluids", "hydration"], answer: { text: "Cool water (not iced), coconut water, mint tea, fennel tea, rose water, and aloe vera juice. Avoid alcohol, coffee, and carbonated drinks. Sip fluids throughout the day rather than large quantities at once." } }
        ]
    },
    { 
        topic: "Health Issues", 
        questions: [
            { question: "I suffer from skin rashes and inflammation. What can help?", keywords: ["skin", "rash", "inflammation", "acne", "redness"], answer: { text: "This is excess heat (ushna) in the body. Apply cooling coconut oil or aloe vera gel to the skin. Internally, drink cool (not iced) water with mint or cilantro. The Neer Mudra helps balance the body's water and heat.", mudraKey: "neer" } },
            { question: "I get intense, sharp headaches. What is the Siddha remedy?", keywords: ["intense", "sharp", "headache", "migraine"], answer: { text: "Pitta headaches are often due to intensity and heat. Apply a cool compress to your forehead. Practice Sheetali (cooling breath) for a few minutes. The Chin Mudra can help calm the mental intensity that often triggers these headaches.", mudraKey: "chin" } },
            { question: "My digestion is too strong, leading to acidity. What should I do?", keywords: ["digestion", "acidity", "heartburn", "reflux"], answer: { text: "Your Agni (digestive fire) is too high. Never skip meals. Eat in a calm environment. The Apan Mudra helps normalize digestive functions and can soothe an overactive system.", mudraKey: "apan" } },
            { question: "How to manage excessive body heat?", keywords: ["body heat", "hot", "sweating", "overheating"], answer: { text: "Cooling baths with sandalwood or rose powder. Wear light-colored, loose clothing. Stay hydrated with cooling fluids. Practice Sheetali pranayama. Avoid direct sun exposure during peak hours." } },
            { question: "I have sensitive eyes and vision issues. Any tips?", keywords: ["eyes", "vision", "sensitive", "eyestrain"], answer: { text: "Pitta governs the eyes. Use rose water eye drops. Practice palming (rubbing hands together and covering eyes). Avoid excessive screen time. Wear sunglasses in bright light. Triphala eyewash can be beneficial." } },
            { question: "How to deal with irritability and anger?", keywords: ["irritability", "anger", "short temper", "frustration"], answer: { text: "Recognize early warning signs. Practice deep breathing. Cooling aromatherapy like sandalwood or rose. Avoid confrontations when hungry or tired. Channel energy into physical activity. The Man Mudra helps calm intense emotions.", mudraKey: "man" } },
            { question: "What helps with acid reflux at night?", keywords: ["acid reflux", "nighttime", "heartburn", "sleep disruption"], answer: { text: "Eat dinner at least 3 hours before bed. Sleep with your head elevated. Drink aloe vera juice before meals. Avoid tomatoes, onions, and spicy foods in the evening. Practice left-nostril breathing before sleep." } }
        ]
    },
    { 
        topic: "Exercise & Energy", 
        questions: [
            { question: "What type and intensity of exercise is best?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness", "activity"], answer: { text: "Intensity should be moderate. The goal is to release tension, not build more heat. Excellent types are swimming, hiking in the shade, recreational sports (non-competitive), and yoga in a well-ventilated room. Avoid exercising in the midday sun." } },
            { question: "My energy is intense but I crash. How do I sustain it?", keywords: ["energy", "intense", "crash", "sustain"], answer: { text: "Practice moderation to conserve your energy. Pitta's fire burns brightly but can extinguish itself. Build stamina with consistent, moderate effort rather than all-out bursts. The Prana Mudra helps to regulate and sustain your life force energy.", mudraKey: "pran" } },
            { question: "When is the best time for exercise?", keywords: ["exercise timing", "when workout", "morning exercise", "evening workout"], answer: { text: "Early morning (6-10 AM) or late evening (6-8 PM) when temperatures are cooler. Avoid the Pitta time of 10 AM-2 PM when heat is highest. Never exercise during peak digestion (1-2 hours after meals)." } },
            { question: "How to cool down after exercise?", keywords: ["cool down", "after workout", "recovery", "post-exercise"], answer: { text: "Slow, gradual cool-down is essential. Sheetali breathing. Cool (not cold) shower. Hydrate with coconut water. Avoid rushing to next activity. Rest in a cool environment until body temperature normalizes." } },
            { question: "Which yoga practices are most balancing?", keywords: ["yoga", "asanas", "poses", "yoga for pitta"], answer: { text: "Moon salutations instead of sun salutations. Forward bends, gentle twists, and hip openers. Cooling pranayama like Sheetali and Sitkari. Avoid intense heating practices like power yoga or excessive backbends." } }
        ]
    },
    { 
        topic: "Mental Wellness", 
        questions: [
            { question: "I feel mentally 'burnt out' from overworking.", keywords: ["burnt out", "overwork", "stress"], answer: { text: "Pitta's driven nature needs conscious relaxation. Surrender the need to control everything. Spend time in nature without a goal. The Man Mudra, used with calming breathwork, is excellent for releasing mental strain.", mudraKey: "man" } },
            { question: "How to develop more patience?", keywords: ["patience", "impatient", "rushed", "hurry"], answer: { text: "Practice waiting intentionally. Slow down speech and movements. Engage in activities that require patience like gardening or fishing. Observe nature's rhythms. Practice mindfulness in daily tasks." } },
            { question: "What meditation practices cool the mind?", keywords: ["meditation", "cooling meditation", "mental heat", "dhyana"], answer: { text: "Moon meditation, visualization of cool streams or moonlight. Loving-kindness meditation to soften the heart. Walking meditation in nature. Avoid competitive or goal-oriented meditation practices." } },
            { question: "How to manage perfectionism?", keywords: ["perfectionism", "critical", "judgmental", "high standards"], answer: { text: "Practice 'good enough' philosophy. Celebrate progress over perfection. Recognize that excellence doesn't require perfection. Develop compassion for self and others. The Chin Mudra helps cultivate acceptance.", mudraKey: "chin" } },
            { question: "What helps with work-life balance?", keywords: ["work-life balance", "overworking", "boundaries", "time management"], answer: { text: "Set clear boundaries between work and personal time. Schedule leisure activities as seriously as work commitments. Learn to delegate. Practice saying no without guilt. Regular digital detox periods." } }
        ]
    },
    { 
        topic: "Seasonal Care", 
        questions: [
            { question: "How should I care for myself in summer?", keywords: ["summer", "pitta season", "hot weather", "summer care"], answer: { text: "Summer is Pitta season - increase cooling practices. More swimming, cooling foods, and moon gazing. Avoid midday sun. Wear light colors. Increase water intake. Practice cooling breathing exercises regularly." } },
            { question: "What about monsoon season care?", keywords: ["monsoon", "rainy season", "humid", "damp"], answer: { text: "Humidity can aggravate Pitta. Keep environments dry and well-ventilated. Light, easily digestible foods. Herbal teas to prevent infections. Avoid heavy, oily foods that combine with humidity to create heat." } },
            { question: "How to handle seasonal transitions?", keywords: ["seasonal transition", "weather change", "adapting seasons"], answer: { text: "Start cooling practices 2 weeks before summer. Gradual dietary changes. Monitor for signs of heat accumulation. Use gentle cleansing herbs like coriander and fennel. Maintain consistent sleep schedules during transitions." } }
        ]
    }
],

        kapha: [
            { 
                topic: "Lifestyle & Philosophy", 
                questions: [
                    { question: "What is the core principle of a Kapha lifestyle?", keywords: ["core", "principle", "lifestyle", "philosophy"], answer: { text: "To balance Kapha's heavy and static nature, the core principle is 'Gati' (movement) and 'Laghu' (lightness). Seek stimulation, variety, and regular vigorous activity. Avoid daytime napping and a sedentary lifestyle." } },
                    { question: "What is an ideal daily schedule for me?", keywords: ["daily", "schedule", "routine", "plan"], answer: { text: "Wake before 6 AM (this is crucial). Scrape your tongue, then do a vigorous workout immediately to build momentum for the day. Eat a light breakfast. Have your main meal at noon. Keep the evening light and active. Be in bed by 11 PM." } }
                ]
            },
            { 
                topic: "Diet & Nutrition", 
                questions: [
                    { question: "Which foods are good for me?", keywords: ["food", "good", "eat", "take", "diet", "nutrition", "meal"], answer: { text: "Favour foods that are light, dry, and warm. Good choices include: quinoa, millet, steamed vegetables like broccoli and kale, lentils, beans, and pungent fruits like apples and berries. Use warming spices liberally." } },
                    { question: "Which foods should I reduce?", keywords: ["food", "reduce", "avoid", "bad", "stop eating"], answer: { text: "Reduce foods that are heavy, oily, and cold. This includes most dairy (cheese, yogurt, ice cream), wheat, fried foods, and overly sweet or salty items. These increase Kapha's qualities." } },
                    { question: "What are the best tastes (Arusuvai) for Kapha?", keywords: ["taste", "arusuvai", "flavor"], answer: { text: "You should favor the Pungent (Kaarppu), Bitter (Kasappu), and Astringent (Thuvarppu) tastes as they are lightening and drying for Kapha. Minimize Sweet, Sour, and Salty tastes." } }
                ]
            },
            { 
                topic: "Health Issues", 
                questions: [
                    { question: "I often feel congested and have excess mucus. What helps?", keywords: ["congest", "mucus", "phlegm", "cold"], answer: { text: "This is a classic Kapha imbalance. Start your day with a glass of warm water with honey and lemon. Use a neti pot to cleanse nasal passages. The Apan Mudra helps clear channels and remove waste (Mala) from the body.", mudraKey: "apan" } },
                    { question: "I feel sluggish and heavy after eating. How can I improve this?", keywords: ["sluggish", "heavy", "eating", "digestion"], answer: { text: "Your digestive fire (Agni) is slow. Eat your main meal at midday and keep dinner very light. A short walk after meals can significantly aid digestion. Dry-brushing (Garshana) before a shower also stimulates metabolism." } }
                ]
            },
            { 
                topic: "Exercise & Energy", 
                questions: [
                    { question: "What type and intensity of exercise is best?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness", "activity"], answer: { text: "Intensity should be high. The goal is to challenge your endurance and break a sweat. Excellent types are running, cycling, dancing, circuit training, and other high-intensity workouts. Consistency is key to preventing stagnation." } },
                    { question: "How do I build and maintain my energy levels?", keywords: ["build", "maintain", "energy", "vitality"], answer: { text: "For Kapha, energy is built through expenditure. The more you move, the more energy you will have. The Pran Mudra is excellent for activating the body's vital energy and overcoming feelings of lethargy.", mudraKey: "pran" } }
                ]
            },
            { 
                topic: "Mental Wellness", 
                questions: [
                    { question: "I lack motivation and feel mentally dull. How can I fix this?", keywords: ["motivation", "dull", "lazy", "lethargic"], answer: { text: "Stimulate your mind! Challenge yourself by learning a new skill, reading an engaging book, or doing puzzles. The Chin Mudra enhances consciousness and can help cut through mental fog, improving focus.", mudraKey: "chin" } },
                    { question: "I feel emotionally heavy and attached. How do I find lightness?", keywords: ["emotion", "heavy", "attach", "sad"], answer: { text: "Practice non-attachment by decluttering your physical space and your mind. Journaling can help release stagnant emotions. The Man Mudra, by calming the mind, allows for clearer perspective and the ability to let go.", mudraKey: "man" } }
                ]
            }
        ],
        
        "vata-pitta": [
            { 
                topic: "Lifestyle & Balance", 
                questions: [
                    { question: "What is my primary lifestyle focus?", keywords: ["lifestyle", "focus", "principle", "main goal"], answer: { text: "Your focus is on 'grounded moderation'. You need a routine to calm Vata, but it must be flexible enough not to frustrate Pitta's desire for action. Schedule your day, but include unplanned 'free time' to prevent burnout." } },
                    { question: "What is the right exercise intensity for me?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness"], answer: { text: "Your intensity should be moderate and consistent. Aim for about 70% of your maximum effort. The goal is to build stamina without causing inflammation or exhaustion. If you feel irritable or wired after a workout, you've pushed too hard." } }
                ]
            },
            { 
                topic: "Diet & Nutrition", 
                questions: [
                    { question: "Which foods are best for me?", keywords: ["food", "eat", "diet", "nutrition", "meal"], answer: { text: "Favour foods that are both grounding (for Vata) and cooling (for Pitta). Good choices are basmati rice, quinoa, mung beans, sweet potatoes, cucumber, cilantro, and sweet, ripe fruits like pears and melons. Ghee is excellent." } },
                    { question: "What kind of snacks are best?", keywords: ["snack", "best", "food"], answer: { text: "Choose snacks that are both nourishing and not overly heating. A sweet apple with almond butter, a ripe pear, or a small bowl of cottage cheese are good options. Avoid dry crackers (aggravates Vata) and salty chips (aggravates Pitta)." } }
                ]
            },
            { 
                topic: "Health Issues", 
                questions: [
                    { question: "I get headaches that are sharp but also have tension. What helps?", keywords: ["headache", "sharp", "tension", "migraine"], answer: { text: "This is a Vata-Pitta headache. The sharpness is Pitta, the tension is Vata. Apply a cool compress to your forehead to soothe Pitta. Simultaneously, gently massage your neck and shoulders with warm oil to release Vata's tension.", mudraKey: "man" } },
                    { question: "My stress shows as anxiety and skin issues. What to do?", keywords: ["stress", "anxiety", "skin", "rash", "worry"], answer: { text: "This is Vata's anxiety and Pitta's inflammation. Practice Nadi Shodhana (Alternate Nostril Breathing) to calm the entire nervous system. Use coconut oil on your skin to cool any rashes.", mudraKey: "neer" } },
                    { question: "My digestion is unpredictable. What to do?", keywords: ["digestion", "unpredictable", "stomach", "gas", "acidity"], answer: { text: "This is Vata's irregularity meeting Pitta's sharpness. The key is regular meal times to ground Vata. Never skip meals, which aggravates Pitta. Use cooling digestive spices like fennel and coriander. Avoid chili.", mudraKey: "apan" } }
                ]
            },
            { 
                topic: "Mental Wellness", 
                questions: [
                    { question: "How can I improve focus without getting intense?", keywords: ["improve", "focus", "intense", "concentrate"], answer: { text: "Practice Trataka (candle gazing) for a few minutes. This steadies the Vata mind and cools the intense Pitta gaze, leading to a calm, sustained focus. The Chin Mudra is also excellent for this.", mudraKey: "chin" } }
                ]
            }
        ],

        "vata-kapha": [
            { 
                topic: "Lifestyle & Balance", 
                questions: [
                    { question: "What is my primary lifestyle focus?", keywords: ["lifestyle", "focus", "principle", "main goal"], answer: { text: "Your focus is on 'warm and active stability'. You need a daily routine (for Vata) filled with invigorating activities (for Kapha). A consistent wake-up time followed by a stimulating dry brush massage (Garshana) is a perfect start to your day." } },
                    { question: "What is the right exercise intensity for me?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness"], answer: { text: "Your intensity can be moderate to high, but it must be consistent. The goal is to generate heat and sweat to counter Kapha, but the movements should be flowing and rhythmic to soothe Vata. A fast-paced Vinyasa yoga class is a perfect example." } }
                ]
            },
            { 
                topic: "Diet & Nutrition", 
                questions: [
                    { question: "What should my diet look like?", keywords: ["diet", "food", "eat", "nutrition"], answer: { text: "Your diet should be 'warm, light, and moist'. Think well-spiced vegetable soups, baked/stewed foods, and quinoa. Avoid both cold/raw foods (which aggravate Vata) and heavy/oily foods (which aggravate Kapha)." } },
                    { question: "What kind of breakfast is best to avoid sluggishness?", keywords: ["breakfast", "sluggish", "morning meal", "lazy"], answer: { text: "A warm, lightly spiced, and dry breakfast is ideal. Think cooked quinoa with cinnamon and cardamom, or a savory spiced millet porridge. Avoid heavy, milky oatmeal or cold smoothies." } }
                ]
            },
            { 
                topic: "Health Issues", 
                questions: [
                    { question: "I get dull, congestive headaches. What helps?", keywords: ["dull", "congest", "headache", "sinus"], answer: { text: "This is a classic Kapha-Vata headache. Use steam inhalation with a few drops of eucalyptus oil to clear congestion. Following that, lie down in a quiet, warm room to calm the Vata element. The Pran Mudra can help get energy moving again.", mudraKey: "pran" } },
                    { question: "My skin is dry in some places and oily in others. What should I do?", keywords: ["skin", "dry", "oily", "complexion"], answer: { text: "This duality requires a two-pronged approach. Use a light, hydrating oil like jojoba for dry areas. For oily areas, ensure gentle but regular cleansing. The Neer Mudra can help balance the overall hydration of your body from within.", mudraKey: "neer" } },
                    { question: "How can I improve my digestion, which is slow and gassy?", keywords: ["digestion", "slow", "gas", "bloat", "stomach"], answer: { text: "This is Kapha's slowness combined with Vata's gas. The Apan Mudra is excellent for regulating elimination. Also, drink warm ginger tea with meals to stimulate your digestive fire and prevent both issues.", mudraKey: "apan" } }
                ]
            },
            { 
                topic: "Mental Wellness", 
                questions: [
                    { question: "I feel foggy and worried at the same time. How do I find clarity?", keywords: ["foggy", "worried", "clarity", "mind", "anxious", "dull"], answer: { text: "This is Kapha's mental fog mixed with Vata's anxiety. The solution is 'calm stimulation.' Engage your mind with a new book or puzzle (for Kapha) in a warm, quiet, and cozy environment (for Vata).", mudraKey: "chin" } }
                ]
            }
        ],

        "pitta-kapha": [
            { 
                topic: "Lifestyle & Balance", 
                questions: [
                    { question: "What is my primary lifestyle focus?", keywords: ["lifestyle", "focus", "principle", "main goal"], answer: { text: "Your focus is on 'motivated release'. You have great stamina (Kapha) and drive (Pitta). Channel this into regular, challenging exercise. It's also vital to practice letting go of grudges or perfectionism to avoid emotional stagnation." } },
                    { question: "What is the right exercise intensity for me?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness"], answer: { text: "Your intensity can be high, as both doshas can handle it, but it should not be in a heated environment. Aim to build a sweat through vigorous effort, like circuit training or running, but always finish with a proper cool-down and stretching to pacify Pitta." } }
                ]
            },
            { 
                topic: "Diet & Nutrition", 
                questions: [
                    { question: "Which foods will keep me satisfied but not heavy?", keywords: ["food", "satisfied", "heavy", "eat", "diet"], answer: { text: "Focus on foods that are both cooling and light. A large bowl of steamed vegetables with chickpeas and quinoa, seasoned with spices like turmeric and coriander, is perfect. It satisfies Pitta's hunger without adding to Kapha's bulk." } },
                    { question: "How do I manage my strong appetite without gaining weight?", keywords: ["appetite", "weight", "gain", "hunger"], answer: { text: "You have Pitta's strong hunger and Kapha's tendency to gain weight. Fill up on high-fiber, low-calorie foods like steamed vegetables and large salads (with a light, non-oily dressing). This satisfies Pitta's need for volume without aggravating Kapha.", mudraKey: "apan" } }
                ]
            },
            { 
                topic: "Health Issues", 
                questions: [
                    { question: "I get headaches with a feeling of pressure behind the eyes. What is it?", keywords: ["headache", "pressure", "eyes", "sinus"], answer: { text: "This sounds like a Pitta-Kapha headache, where heat (Pitta) and congestion (Kapha) build up. Apply a cool cloth to the eyes. A gentle nasal rinse (Neti) can help relieve sinus pressure. The Chin Mudra can help calm the mind during this.", mudraKey: "chin" } },
                    { question: "My digestion is strong but I feel heavy afterwards. What's happening?", keywords: ["digestion", "strong", "heavy", "metabolism", "sluggish"], answer: { text: "You have Pitta's powerful hunger but Kapha's slower metabolism. This means you can digest well, but the aftermath feels heavy. Eat mindfully and stop at 75% full. A short, brisk walk after meals will greatly help fire up your metabolism." } }
                ]
            },
            { 
                topic: "Mental Wellness", 
                questions: [
                    { question: "I'm usually calm but can be very stubborn. How can I be more flexible?", keywords: ["stubborn", "flexible", "rigid", "mindset"], answer: { text: "This is Kapha's stability hardening into Pitta's determination. Practice active listening and consciously try to see other perspectives. A heart-opening yoga practice can also foster a more receptive state of mind." } },
                    { question: "I have good stamina but sometimes lack motivation. How do I stay driven?", keywords: ["stamina", "motivation", "driven", "energy", "lazy"], answer: { text: "This is Pitta's drive fighting Kapha's desire for comfort. The key is to make your goals exciting and your routine varied. Challenge yourself with new workouts or outdoor activities to keep both doshas engaged.", mudraKey: "pran" } }
                ]
            }
        ],

        "tridoshic": [
            { 
                topic: "Balance & Harmony", 
                questions: [
                    { question: "As a balanced type, what is my main goal?", keywords: ["balanced", "goal", "focus", "principle"], answer: { text: "Your goal is 'Samanvaya' (harmony) through seasonal adaptation. Your primary tool is a 'Ritucharya' (seasonal regimen). Eat and act in ways that balance the dominant qualities of the current season to maintain your natural equilibrium.", mudraKey: "pran" } },
                    { question: "What is the most important daily habit for me?", keywords: ["important", "daily", "habit", "routine"], answer: { text: "Waking and sleeping with the sun. This single habit aligns your internal clock with the rhythm of nature, which is the most powerful way for a tridoshic individual to preserve their innate balance and health." } }
                ]
            },
            { 
                topic: "Diet & Seasonal Eating", 
                questions: [
                    { question: "How do I eat throughout the year?", keywords: ["eat", "year", "season", "food", "diet"], answer: { text: "In summer, favor cooling Pitta-pacifying foods. In the dry, windy autumn, choose grounding Vata-pacifying foods. In the cold, damp spring, opt for light, stimulating Kapha-pacifying foods. This seasonal awareness is key." } },
                    { question: "What is the ideal food for maintaining balance?", keywords: ["ideal", "food", "balance", "diet", "eat"], answer: { text: "A simple meal of rice, dal (mung beans), and one or two seasonal vegetables, cooked with a moderate amount of ghee and mild spices, is the perfect tridoshic meal. It contains all necessary components without aggravating any single dosha." } }
                ]
            },
            { 
                topic: "Exercise & Seasonal Adaptation", 
                questions: [
                    { question: "What is the right exercise intensity for me?", keywords: ["exercise", "excercise", "excersise", "intensity", "workout", "fitness"], answer: { text: "Your exercise intensity should vary with the seasons. Gentle and moderate in summer (Pitta season). Grounding and strengthening in autumn (Vata season). More vigorous and sweat-inducing in spring (Kapha season). Always listen to your body's daily energy levels." } }
                ]
            },
            { 
                topic: "Health & Wellness", 
                questions: [
                    { question: "How do I deal with occasional headaches?", keywords: ["deal", "headache"], answer: { text: "For a tridoshic type, a headache is often the first sign of an imbalance. First, identify the cause. Is it from stress (Vata)? Heat (Pitta)? Or congestion (Kapha)? Then apply the appropriate remedy. A gentle head massage with warm Brahmi oil is a safe, generally balancing remedy.", mudraKey: "man" } },
                    { question: "My digestion is good, but how do I keep it that way?", keywords: ["digestion", "keep", "stomach", "maintain"], answer: { text: "Focus on mindful eating. Chew your food thoroughly and eat in a calm, settled environment. The Apan Mudra can be practiced for a few minutes after meals to ensure the digestive process completes smoothly.", mudraKey: "apan" } }
                ]
            },
            { 
                topic: "Mind & Balance", 
                questions: [
                    { question: "What's a simple practice to quickly regain balance?", keywords: ["simple", "practice", "balance", "breathing", "pranayama", "reset"], answer: { text: "Nadi Shodhana (Alternate Nostril Breathing) is the ultimate tridoshic balancing practice. It calms Vata, cools Pitta, and clears Kapha channels. Practicing for just 5 minutes can restore a sense of harmony and well-being.", mudraKey: "man" } }
                ]
            }
        ]
    },

    getTopics(bodyType) {
        let specificTopics = [];
        if (this.qaData[bodyType]) {
            specificTopics = this.qaData[bodyType];
        } else if (bodyType && bodyType.includes('pitta')) {
            specificTopics = this.qaData.pitta;
        } else if (bodyType && bodyType.includes('vata')) {
            specificTopics = this.qaData.vata;
        } else if (bodyType && bodyType.includes('kapha')) {
            specificTopics = this.qaData.kapha;
        }

        return [...specificTopics, ...this.qaData.generalTopics];
    },

    getQuestionsForTopic(bodyType, topicName) {
        const topics = this.getTopics(bodyType);
        const topic = topics.find(t => t.topic === topicName);
        return topic ? topic.questions : [];
    },

    getAllQuestions(bodyType) {
        const topics = this.getTopics(bodyType);
        let allQuestions = [];
        topics.forEach(topic => {
            allQuestions = [...allQuestions, ...topic.questions];
        });
        return allQuestions;
    },
    
    findQuestion(query, qaList) {
        const lowerCaseQuery = query.toLowerCase().trim();

        const exactMatch = qaList.find(qa => qa.question.toLowerCase().trim() === lowerCaseQuery);
        if (exactMatch) {
            return exactMatch;
        }

        let bestMatch = null;
        let maxScore = 0;

        qaList.forEach(qa => {
            if (!qa.keywords || qa.keywords.length === 0) return;

            let currentScore = 0;
            qa.keywords.forEach(keyword => {
                if (lowerCaseQuery.includes(keyword)) {
                    currentScore++;
                }
            });

            if (currentScore > maxScore) {
                maxScore = currentScore;
                bestMatch = qa;
            }
        });

        return maxScore > 0 ? bestMatch : null;
    },

    checkForComplexDisease(query) {
        const keywords = ['cancer', 'diabetes', 'tumor', 'heart attack', 'stroke', 'kidney failure', 'disease', 'chronic', 'severe pain', 'blood pressure', 'epilepsy', 'paralysis','fever'];
        const lowerCaseQuery = query.toLowerCase();
        for (const keyword of keywords) {
            if (lowerCaseQuery.includes(keyword)) {
                return true;
            }
        }
        return false;
    }
};