// Model - Data and business logic
const Model = {
    questions: [
        {
            id: 'weight',
            text: 'How would you describe your weight/body frame?',
            options: [
                { value: 'lean', text: 'Lean/thin, difficult to gain weight', type: 'vata' },
                { value: 'average', text: 'Medium build, can gain or lose weight easily', type: 'pitta' },
                { value: 'difficult to lose', text: 'Heavier build, gains weight easily, difficult to lose', type: 'kapha' }
            ]
        },
        {
            id: 'walking',
            text: 'How would you describe your walking pace?',
            options: [
                { value: 'fast', text: 'Fast, quick steps', type: 'vata' },
                { value: 'moderate', text: 'Moderate, purposeful steps', type: 'pitta' },
                { value: 'slow', text: 'Slow, steady pace', type: 'kapha' }
            ]
        },
        {
            id: 'speech',
            text: 'How would you describe your speech pattern?',
            options: [
                { value: 'fast', text: 'Fast, may skip words, sometimes jumps between topics', type: 'vata' },
                { value: 'moderate', text: 'Moderate, clear, precise, sometimes sharp or intense', type: 'pitta' },
                { value: 'slow', text: 'Slow, methodical, calm and measured', type: 'kapha' }
            ]
        },
        {
            id: 'weather',
            text: 'Which weather condition bothers you the most?',
            options: [
                { value: 'warm', text: 'Cold, dry weather - I prefer warmth', type: 'vata' },
                { value: 'cold', text: 'Hot, humid weather - I prefer coolness', type: 'pitta' },
                { value: 'all', text: 'I can adapt to most weather conditions', type: 'kapha' }
            ]
        },
        {
            id: 'sweat',
            text: 'How would you describe your sweating pattern?',
            options: [
                { value: 'mild', text: 'Mild sweating, even in heat', type: 'vata' },
                { value: 'excessive', text: 'Excessive sweating, especially when active or in heat', type: 'pitta' },
                { value: 'excessive with strong odor', text: 'Moderate sweating with noticeable odor', type: 'kapha' }
            ]
        },
        {
            id: 'hunger',
            text: 'How would you describe your hunger pattern?',
            options: [
                { value: 'irregular appetite', text: 'Irregular, sometimes forget to eat', type: 'vata' },
                { value: 'always hunger', text: 'Strong, regular hunger - gets irritable if meals are missed', type: 'pitta' },
                { value: 'moderate hunger', text: 'Can easily skip meals, steady appetite', type: 'kapha' }
            ]
        },
        {
            id: 'skin_type',
            text: 'How would you describe your skin texture?',
            options: [
                { value: 'dry', text: 'Dry, rough, or thin', type: 'vata' },
                { value: 'oily', text: 'Oily or warm, prone to rashes or acne', type: 'pitta' },
                { value: 'cool', text: 'Smooth, thick and cool', type: 'kapha' }
            ]
        },
        {
            id: 'hair_type',
            text: 'How would you describe your hair?',
            options: [
                { value: 'dry brittle', text: 'Dry, brittle, frizzy or curly', type: 'vata' },
                { value: 'straight soft', text: 'Straight, fine texture, tendency to gray or thin early', type: 'pitta' },
                { value: 'oily thick', text: 'Thick, oily, wavy, strong', type: 'kapha' }
            ]
        },
        {
            id: 'lips',
            text: 'How would you describe your lips?',
            options: [
                { value: 'dark dry', text: 'Thin, dry, darker in color', type: 'vata' },
                { value: 'dark up red bottom', text: 'Medium thickness, reddish or pink', type: 'pitta' },
                { value: 'red', text: 'Full, smooth, well-defined', type: 'kapha' }
            ]
        },
        {
            id: 'teeth',
            text: 'How would you describe your teeth?',
            options: [
                { value: 'large', text: 'Protruding, large or irregular, prone to cavities', type: 'vata' },
                { value: 'uneven', text: 'Medium-sized, may have tendency toward gum issues', type: 'pitta' },
                { value: 'perfect', text: 'Strong, well-formed, white', type: 'kapha' }
            ]
        },
        {
            id: 'eyes',
            text: 'How would you describe your eyes?',
            options: [
                { value: 'dark', text: 'Small to medium, dark, active', type: 'vata' },
                { value: 'red', text: 'Medium-sized, penetrating, sensitive to light', type: 'pitta' },
                { value: 'bright', text: 'Large, calm, bright', type: 'kapha' }
            ]
        },
        {
            id: 'memory',
            text: 'How would you describe your memory?',
            options: [
                { value: 'forgets quickly', text: 'Quick to learn but also quick to forget', type: 'vata' },
                { value: 'average', text: 'Sharp memory, especially for details', type: 'pitta' },
                { value: 'never forgets', text: 'Slow to learn but excellent long-term retention', type: 'kapha' }
            ]
        },
        {
            id: 'thinking',
            text: 'How would you describe your thinking style?',
            options: [
                { value: 'quick', text: 'Quick, creative, adaptable', type: 'vata' },
                { value: 'focused', text: 'Focused, logical, analytical', type: 'pitta' },
                { value: 'peacefull', text: 'Methodical, peaceful, sometimes slow', type: 'kapha' }
            ]
        },
        {
            id: 'action_efficiency',
            text: 'How efficient are you in taking action?',
            options: [
                { value: 'quickly but inconsistently', text: 'Quick to start but may not finish, easily distracted', type: 'vata' },
                { value: 'promptly and decisively', text: 'Efficient, organized, decisive', type: 'pitta' },
                { value: 'slowly but steadily', text: 'Slow to start but steady once begun', type: 'kapha' }
            ]
        },
        {
            id: 'sleep',
            text: 'How would you describe your sleep pattern?',
            options: [
                { value: 'light', text: 'Light, easily disturbed, may have insomnia', type: 'vata' },
                { value: 'sound', text: 'Moderate, sound sleep but can wake if needed', type: 'pitta' },
                { value: 'deep', text: 'Deep, heavy, difficult to wake up', type: 'kapha' }
            ]
        },
        {
            id: 'skin_color',
            text: 'What is your natural skin tone?',
            options: [
                { value: 'dark', text: 'Darker or duller tone', type: 'vata' },
                { value: 'redish', text: 'Reddish or yellowish tone', type: 'pitta' },
                { value: 'pale', text: 'Fair or pale tone', type: 'kapha' }
            ]
        },
        {
            id: 'nails',
            text: 'How would you describe your nails?',
            options: [
                { value: 'dull', text: 'Dry, rough, brittle, dark', type: 'vata' },
                { value: 'soft red', text: 'Flexible, pink, well-shaped', type: 'pitta' },
                { value: 'pale', text: 'Strong, large, smooth, pale', type: 'kapha' }
            ]
        }
    ],
    currentQuestionIndex: 0,
    answers: {},
    
    setAnswer(questionId, value) {
        this.answers[questionId] = value;
    },
    
    calculateBodyType() {
        let vata = 0, pitta = 0, kapha = 0;
        
        // Count the scores based on answers
        for (const questionId in this.answers) {
            const answer = this.answers[questionId];
            const question = this.questions.find(q => q.id === questionId);
            const option = question.options.find(opt => opt.value === answer);
            
            if (option.type === 'vata') vata++;
            if (option.type === 'pitta') pitta++;
            if (option.type === 'kapha') kapha++;
        }
        
        // Determine body type based on highest scores
        if (vata > pitta && vata > kapha) {
            return "vata";
        } else if (pitta > vata && pitta > kapha) {
            return "pitta";
        } else if (kapha > vata && kapha > pitta) {
            return "kapha";
        } else if (vata === pitta && vata > kapha) {
            return "vata-pitta";
        } else if (vata === kapha && vata > pitta) {
            return "vata-kapha";
        } else if (pitta === kapha && pitta > vata) {
            return "pitta-kapha";
        } else {
            return "tridoshic";
        }
    },
    
    getRecommendations(bodyType) {
        const recommendations = {
            diet: {
                vata: "Favor warm, cooked, moist foods. Include sweet, salty, and sour tastes. Avoid raw foods, cold drinks, and dried fruits. Have regular meals and avoid skipping them.",
                pitta: "Favor cooling foods like sweet fruits, vegetables, and grains. Include sweet, bitter, and astringent tastes. Avoid spicy, oily, and fermented foods. Moderate your intake of salt.",
                kapha: "Favor light, dry, and warm foods. Include pungent, bitter, and astringent tastes. Avoid heavy, oily, and sweet foods. Limit dairy and cold items. Eat smaller portions.",
                "vata-pitta": "Balance between warm foods (for Vata) and cooling foods (for Pitta). Include sweet and slightly sour tastes. Avoid extremely spicy or extremely cold foods. Maintain regular meal times.",
                "vata-kapha": "Favor warm and light foods. Include pungent and bitter tastes in moderation. Avoid heavy, cold, and dry foods. Have regular but moderate-sized meals.",
                "pitta-kapha": "Favor cooling and light foods. Include bitter and astringent tastes. Avoid oily, spicy, and heavy foods. Eat moderate portions at regular intervals.",
                tridoshic: "Maintain a balanced diet with all six tastes (sweet, sour, salty, pungent, bitter, astringent). Adjust your diet seasonally and based on how you feel. Focus on fresh, whole foods."
            },
            lifestyle: {
                vata: "Maintain a regular daily routine. Get adequate rest and avoid excessive travel or movement. Practice calming activities like meditation. Keep warm and avoid cold, windy conditions.",
                pitta: "Avoid excessive heat and direct sunlight. Engage in moderate, cooling exercise like swimming. Make time for relaxation and avoid intense competition. Practice moon-gazing meditation.",
                kapha: "Stay active and maintain variety in your routine. Wake up early and avoid daytime naps. Challenge yourself with new activities. Practice stimulating breathing exercises.",
                "vata-pitta": "Balance stability (for Vata) with moderation (for Pitta). Maintain a regular but not rigid schedule. Alternate between calming and moderately stimulating activities. Get adequate rest but stay active.",
                "vata-kapha": "Combine stability (for Vata) with activity (for Kapha). Maintain a regular schedule with variety. Balance rest with exercise. Practice both calming and stimulating activities.",
                "pitta-kapha": "Balance cooling activities (for Pitta) with stimulation (for Kapha). Avoid excessive heat and stagnation. Engage in moderate, regular exercise. Make time for both relaxation and activity.",
                tridoshic: "Adapt your lifestyle to the seasons and your current state. Balance rest and activity. Practice moderation in all things. Stay attuned to your body's changing needs."
            },
            exercise: {
                vata: "Gentle, grounding exercises like walking, yoga (especially with slow, flowing movements), tai chi, and swimming in warm water. Avoid excessive running or jumping.",
                pitta: "Moderate, cooling exercises like swimming, moonlight walks, cycling, and yoga (especially forward bends and twists). Avoid intense competition and exercising in hot conditions.",
                kapha: "Vigorous, stimulating exercises like brisk walking, jogging, dance, martial arts, and energetic yoga. Aim for variety and challenge in your routine.",
                "vata-pitta": "Balanced exercises like moderate walking, swimming in comfortable temperature water, and balanced yoga practice. Alternate between calming and moderately stimulating activities.",
                "vata-kapha": "Consistent but varied exercise that is gentle yet stimulating. Try yoga with a mix of grounding and energizing poses, regular walking, and dancing.",
                "pitta-kapha": "Regular, moderate exercise that provides stimulation without overheating. Swimming, hiking in shaded areas, and yoga with standing poses and twists.",
                tridoshic: "Varied exercise adjusted to the seasons and your current state. Include a mix of strength, flexibility, and endurance training. Listen to your body's needs each day."
            }
        };
        
        return {
            diet: recommendations.diet[bodyType],
            lifestyle: recommendations.lifestyle[bodyType],
            exercise: recommendations.exercise[bodyType]
        };
    }
};