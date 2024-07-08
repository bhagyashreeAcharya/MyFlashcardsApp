import { importAll } from '../utils';

const alphabetImages = importAll(require.context('../assets/images/alphabets', false, /\.(png|jpe?g|svg)$/));
const wildAnimalImages = importAll(require.context('../assets/images/wildanimals', false, /\.(png|jpe?g|svg)$/));
const domesticAndFarmImages = importAll(require.context('../assets/images/domesticandfarm', false, /\.(png|jpe?g|svg)$/));
const seaAnimalImages = importAll(require.context('../assets/images/sea-animal', false, /\.(png|jpe?g|svg)$/));
const marathiAlphabetImages = importAll(require.context('../assets/images/marathi-alphabets', false, /\.(png|jpe?g|svg)$/));
const insectImages = importAll(require.context('../assets/images/insects', false, /\.(png|jpe?g|svg)$/));

const flashcardsData = {
  categories: [
    {
      id: 'alphabets',
      name: 'Alphabets',
      flashcards: Object.keys(alphabetImages).map((key, index) => ({
        id: `alphabets-${index}`,
        name: key.split('.')[0],
        image: alphabetImages[key],
      })),
    },
    {
      id: 'marathi-alphabets',
      name: 'Marathi Alphabets',
      flashcards: Object.keys(marathiAlphabetImages).map((key, index) => ({
        id: `marathi-alphabets-${index}`,
        name: key.split('.')[0],
        image: marathiAlphabetImages[key],
      })),
    },
    
    {
      id: 'wildanimals',
      name: 'Wild Animals',
      flashcards: Object.keys(wildAnimalImages).map((key, index) => ({
        id: `wildanimals-${index}`,
        name: key.split('.')[0],
        image: wildAnimalImages[key],
      })),
    },
    {
      id: 'domesticandfarm',
      name: 'Domestic and Farm Animals',
      flashcards: Object.keys(domesticAndFarmImages).map((key, index) => ({
        id: `domesticandfarm-${index}`,
        name: key.split('.')[0],
        image: domesticAndFarmImages[key],
      })),
    },
    {
      id: 'sea-animal',
      name: 'Sea Animals',
      flashcards: Object.keys(seaAnimalImages).map((key, index) => ({
        id: `sea-animal-${index}`,
        name: key.split('.')[0],
        image: seaAnimalImages[key],
      })),
    },
    {
      id: 'insects',
      name: 'Insects',
      flashcards: Object.keys(insectImages).map((key, index) => ({
        id: `insects-${index}`,
        name: key.split('.')[0],
        image: insectImages[key],
      })),
    },
  ],
};

export default flashcardsData;
