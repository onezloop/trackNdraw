import type { Artwork } from '../types'

// Under 5 — big, simple shapes
import cat from '../assets/art/cat.svg'
import house from '../assets/art/house.svg'
import car from '../assets/art/car.svg'
import flower from '../assets/art/flower.svg'
import fish from '../assets/art/fish.svg'
import rocket from '../assets/art/rocket.svg'
import star from '../assets/art/star.svg'
import sun from '../assets/art/sun.svg'
import dog from '../assets/art/dog.svg'
import butterfly from '../assets/art/butterfly.svg'
import tree from '../assets/art/tree.svg'
import boat from '../assets/art/boat.svg'
import airplane from '../assets/art/airplane.svg'
import elephant from '../assets/art/elephant.svg'
import bird from '../assets/art/bird.svg'
import iceCream from '../assets/art/ice-cream.svg'
import balloon from '../assets/art/balloon.svg'
import robot from '../assets/art/robot.svg'
import rabbit from '../assets/art/rabbit.svg'
import duck from '../assets/art/duck.svg'
import turtle from '../assets/art/turtle.svg'
import penguin from '../assets/art/penguin.svg'
import lion from '../assets/art/lion.svg'
import whale from '../assets/art/whale.svg'
import crab from '../assets/art/crab.svg'
import snail from '../assets/art/snail.svg'
import mushroom from '../assets/art/mushroom.svg'
import rainbow from '../assets/art/rainbow.svg'

// Under 10 — more detail, still bold outlines
import unicorn from '../assets/art/unicorn.svg'
import dinosaur from '../assets/art/dinosaur.svg'
import castle from '../assets/art/castle.svg'
import dolphin from '../assets/art/dolphin.svg'
import owl from '../assets/art/owl.svg'
import fox from '../assets/art/fox.svg'
import ladybug from '../assets/art/ladybug.svg'
import cupcake from '../assets/art/cupcake.svg'
import lighthouse from '../assets/art/lighthouse.svg'
import hotAirBalloon from '../assets/art/hot-air-balloon.svg'
import frog from '../assets/art/frog.svg'
import giraffe from '../assets/art/giraffe.svg'
import raceCar from '../assets/art/race-car.svg'
import guitar from '../assets/art/guitar.svg'
import octopus from '../assets/art/octopus.svg'
import panda from '../assets/art/panda.svg'
import koala from '../assets/art/koala.svg'
import monkey from '../assets/art/monkey.svg'
import zebra from '../assets/art/zebra.svg'
import bee from '../assets/art/bee.svg'
import train from '../assets/art/train.svg'
import tractor from '../assets/art/tractor.svg'
import submarine from '../assets/art/submarine.svg'
import kite from '../assets/art/kite.svg'
import pizza from '../assets/art/pizza.svg'
import donut from '../assets/art/donut.svg'
import cactus from '../assets/art/cactus.svg'
import windmill from '../assets/art/windmill.svg'

// Under 15 — detailed, richly coloured vector art. Unlike the sets above these
// are not hand-drawn: they are CC0 / public-domain drawings from freesvg.org.
// See CREDITS.md.
import lionArt from '../assets/art/under15/lion.svg'
import wolfArt from '../assets/art/under15/wolf.svg'
import dragonArt from '../assets/art/under15/dragon.svg'
import eagleArt from '../assets/art/under15/eagle.svg'
import hummingbirdArt from '../assets/art/under15/hummingbird.svg'
import koiFishArt from '../assets/art/under15/koi-fish.svg'
import butterflyArt from '../assets/art/under15/butterfly.svg'
import seahorseArt from '../assets/art/under15/seahorse.svg'
import chameleonArt from '../assets/art/under15/chameleon.svg'
import motorbikeArt from '../assets/art/under15/motorbike.svg'
import sportsCarArt from '../assets/art/under15/sports-car.svg'
import electricGuitarArt from '../assets/art/under15/electric-guitar.svg'
import mandalaArt from '../assets/art/under15/mandala.svg'
import lotusArt from '../assets/art/under15/lotus.svg'
import sailingShipArt from '../assets/art/under15/sailing-ship.svg'
import deerArt from '../assets/art/under15/deer.svg'
import cobraArt from '../assets/art/under15/cobra.svg'
import crocodileArt from '../assets/art/under15/crocodile.svg'
import scorpionArt from '../assets/art/under15/scorpion.svg'
import phoenixArt from '../assets/art/under15/phoenix.svg'
import dragonflyArt from '../assets/art/under15/dragonfly.svg'
import skateboardArt from '../assets/art/under15/skateboard.svg'
import helicopterArt from '../assets/art/under15/helicopter.svg'
import hotRodArt from '../assets/art/under15/hot-rod.svg'
import cameraArt from '../assets/art/under15/camera.svg'
import sneakerArt from '../assets/art/under15/sneaker.svg'
import headphonesArt from '../assets/art/under15/headphones.svg'
import gameControllerArt from '../assets/art/under15/game-controller.svg'

export const builtInArtworks: Artwork[] = [
  { id: 'cat', name: 'Cat', src: cat, ageGroup: 'under5' },
  { id: 'dog', name: 'Dog', src: dog, ageGroup: 'under5' },
  { id: 'rabbit', name: 'Rabbit', src: rabbit, ageGroup: 'under5' },
  { id: 'lion', name: 'Lion', src: lion, ageGroup: 'under5' },
  { id: 'house', name: 'House', src: house, ageGroup: 'under5' },
  { id: 'car', name: 'Car', src: car, ageGroup: 'under5' },
  { id: 'flower', name: 'Flower', src: flower, ageGroup: 'under5' },
  { id: 'fish', name: 'Fish', src: fish, ageGroup: 'under5' },
  { id: 'rocket', name: 'Rocket', src: rocket, ageGroup: 'under5' },
  { id: 'star', name: 'Star', src: star, ageGroup: 'under5' },
  { id: 'sun', name: 'Sun', src: sun, ageGroup: 'under5' },
  { id: 'rainbow', name: 'Rainbow', src: rainbow, ageGroup: 'under5' },
  { id: 'butterfly', name: 'Butterfly', src: butterfly, ageGroup: 'under5' },
  { id: 'tree', name: 'Tree', src: tree, ageGroup: 'under5' },
  { id: 'boat', name: 'Boat', src: boat, ageGroup: 'under5' },
  { id: 'airplane', name: 'Airplane', src: airplane, ageGroup: 'under5' },
  { id: 'elephant', name: 'Elephant', src: elephant, ageGroup: 'under5' },
  { id: 'bird', name: 'Bird', src: bird, ageGroup: 'under5' },
  { id: 'duck', name: 'Duck', src: duck, ageGroup: 'under5' },
  { id: 'turtle', name: 'Turtle', src: turtle, ageGroup: 'under5' },
  { id: 'penguin', name: 'Penguin', src: penguin, ageGroup: 'under5' },
  { id: 'whale', name: 'Whale', src: whale, ageGroup: 'under5' },
  { id: 'crab', name: 'Crab', src: crab, ageGroup: 'under5' },
  { id: 'snail', name: 'Snail', src: snail, ageGroup: 'under5' },
  { id: 'mushroom', name: 'Mushroom', src: mushroom, ageGroup: 'under5' },
  { id: 'ice-cream', name: 'Ice Cream', src: iceCream, ageGroup: 'under5' },
  { id: 'balloon', name: 'Balloon', src: balloon, ageGroup: 'under5' },
  { id: 'robot', name: 'Robot', src: robot, ageGroup: 'under5' },

  { id: 'unicorn', name: 'Unicorn', src: unicorn, ageGroup: 'under10' },
  { id: 'dinosaur', name: 'Dinosaur', src: dinosaur, ageGroup: 'under10' },
  { id: 'dolphin', name: 'Dolphin', src: dolphin, ageGroup: 'under10' },
  { id: 'owl', name: 'Owl', src: owl, ageGroup: 'under10' },
  { id: 'fox', name: 'Fox', src: fox, ageGroup: 'under10' },
  { id: 'frog', name: 'Frog', src: frog, ageGroup: 'under10' },
  { id: 'giraffe', name: 'Giraffe', src: giraffe, ageGroup: 'under10' },
  { id: 'octopus', name: 'Octopus', src: octopus, ageGroup: 'under10' },
  { id: 'ladybug', name: 'Ladybug', src: ladybug, ageGroup: 'under10' },
  { id: 'castle', name: 'Castle', src: castle, ageGroup: 'under10' },
  { id: 'lighthouse', name: 'Lighthouse', src: lighthouse, ageGroup: 'under10' },
  {
    id: 'hot-air-balloon',
    name: 'Hot Air Balloon',
    src: hotAirBalloon,
    ageGroup: 'under10',
  },
  { id: 'race-car', name: 'Race Car', src: raceCar, ageGroup: 'under10' },
  { id: 'guitar', name: 'Guitar', src: guitar, ageGroup: 'under10' },
  { id: 'cupcake', name: 'Cupcake', src: cupcake, ageGroup: 'under10' },
  { id: 'panda', name: 'Panda', src: panda, ageGroup: 'under10' },
  { id: 'koala', name: 'Koala', src: koala, ageGroup: 'under10' },
  { id: 'monkey', name: 'Monkey', src: monkey, ageGroup: 'under10' },
  { id: 'zebra', name: 'Zebra', src: zebra, ageGroup: 'under10' },
  { id: 'bee', name: 'Bee', src: bee, ageGroup: 'under10' },
  { id: 'train', name: 'Train', src: train, ageGroup: 'under10' },
  { id: 'tractor', name: 'Tractor', src: tractor, ageGroup: 'under10' },
  { id: 'submarine', name: 'Submarine', src: submarine, ageGroup: 'under10' },
  { id: 'kite', name: 'Kite', src: kite, ageGroup: 'under10' },
  { id: 'pizza', name: 'Pizza', src: pizza, ageGroup: 'under10' },
  { id: 'donut', name: 'Donut', src: donut, ageGroup: 'under10' },
  { id: 'cactus', name: 'Cactus', src: cactus, ageGroup: 'under10' },
  { id: 'windmill', name: 'Windmill', src: windmill, ageGroup: 'under10' },

  { id: 'u15-lion', name: 'Lion', src: lionArt, ageGroup: 'under15' },
  { id: 'u15-wolf', name: 'Wolf', src: wolfArt, ageGroup: 'under15' },
  { id: 'u15-dragon', name: 'Dragon', src: dragonArt, ageGroup: 'under15' },
  { id: 'u15-eagle', name: 'Eagle', src: eagleArt, ageGroup: 'under15' },
  {
    id: 'u15-hummingbird',
    name: 'Hummingbird',
    src: hummingbirdArt,
    ageGroup: 'under15',
  },
  { id: 'u15-koi-fish', name: 'Koi Fish', src: koiFishArt, ageGroup: 'under15' },
  {
    id: 'u15-butterfly',
    name: 'Butterfly',
    src: butterflyArt,
    ageGroup: 'under15',
  },
  { id: 'u15-seahorse', name: 'Seahorse', src: seahorseArt, ageGroup: 'under15' },
  {
    id: 'u15-chameleon',
    name: 'Chameleon',
    src: chameleonArt,
    ageGroup: 'under15',
  },
  {
    id: 'u15-motorbike',
    name: 'Motorbike',
    src: motorbikeArt,
    ageGroup: 'under15',
  },
  {
    id: 'u15-sports-car',
    name: 'Sports Car',
    src: sportsCarArt,
    ageGroup: 'under15',
  },
  {
    id: 'u15-electric-guitar',
    name: 'Electric Guitar',
    src: electricGuitarArt,
    ageGroup: 'under15',
  },
  { id: 'u15-mandala', name: 'Mandala', src: mandalaArt, ageGroup: 'under15' },
  { id: 'u15-lotus', name: 'Lotus', src: lotusArt, ageGroup: 'under15' },
  {
    id: 'u15-sailing-ship',
    name: 'Sailing Ship',
    src: sailingShipArt,
    ageGroup: 'under15',
  },
  { id: 'u15-deer', name: 'Deer', src: deerArt, ageGroup: 'under15' },
  { id: 'u15-cobra', name: 'Cobra', src: cobraArt, ageGroup: 'under15' },
  {
    id: 'u15-crocodile',
    name: 'Crocodile',
    src: crocodileArt,
    ageGroup: 'under15',
  },
  { id: 'u15-scorpion', name: 'Scorpion', src: scorpionArt, ageGroup: 'under15' },
  { id: 'u15-phoenix', name: 'Phoenix', src: phoenixArt, ageGroup: 'under15' },
  {
    id: 'u15-dragonfly',
    name: 'Dragonfly',
    src: dragonflyArt,
    ageGroup: 'under15',
  },
  {
    id: 'u15-skateboard',
    name: 'Skateboard',
    src: skateboardArt,
    ageGroup: 'under15',
  },
  {
    id: 'u15-helicopter',
    name: 'Helicopter',
    src: helicopterArt,
    ageGroup: 'under15',
  },
  { id: 'u15-hot-rod', name: 'Hot Rod', src: hotRodArt, ageGroup: 'under15' },
  { id: 'u15-camera', name: 'Camera', src: cameraArt, ageGroup: 'under15' },
  { id: 'u15-sneaker', name: 'Sneaker', src: sneakerArt, ageGroup: 'under15' },
  {
    id: 'u15-headphones',
    name: 'Headphones',
    src: headphonesArt,
    ageGroup: 'under15',
  },
  {
    id: 'u15-game-controller',
    name: 'Game Controller',
    src: gameControllerArt,
    ageGroup: 'under15',
  },
]
