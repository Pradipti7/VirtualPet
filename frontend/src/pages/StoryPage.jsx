import StoryScreen from '../components/StoryScreen'

const STORIES = {
  story1: {
    text: 'One sunny afternoon, you were walking through a beautiful green field. The grass swayed gently in the breeze, and butterflies danced around you...',
    next: 'story2',
  },
  story2: {
    text: 'Then you heard a small sound coming from behind a bush. You knelt down and peeked through the leaves — two tiny, curious eyes stared back at you.',
    next: 'choose',
  },
  story3: {
    text: null,
    next: 'name',
  },
}

function StoryPage({ phase, chosenAnimal, onNext }) {
  const story = STORIES[phase]

  if (phase === 'story3' && chosenAnimal) {
    story.text = `It was a tiny ${chosenAnimal.name.toLowerCase()}! It looked up at you with big curious eyes. You couldn't leave it alone out here. You gently picked it up and decided to take it home.`
  }

  return (
    <div className="min-h-screen field-bg flex items-center justify-center p-4">
      <StoryScreen text={story.text} onNext={() => onNext(story.next)} />
    </div>
  )
}

export default StoryPage
