var samples = [
  {text: "HELLO THERE HOW ARE YOU"},
  {text: "hello THERE how are you"},
  {text: "HELLO THERE YES"},
  {text: "how are you"},
  {text: "potato"},
  {text: "HOW ARE YOU doing"},
  {text: "POTATO"},
  {text: "HELLO THERE HOW ARE YOU"},
  {text: "hello THERE how are you"},
  {text: "HELLO THERE YES"},
  {text: "how are you"},
  {text: "potato"},
  {text: "HOW ARE YOU doing"},
  {text: "POTATO"},
]

samples.forEach(function (sampleObj) {
  var sample = sampleObj.text

  var ratio_of_caps = 0
  var capital_letters = 0
  var amount_of_letters = sample.length

  sample.split('').forEach(function (letter) {
    if (letter !== ' ') {
      if (letter === letter.toUpperCase()) {
        capital_letters++
      }
    } else {
      amount_of_letters--
    }
  })

  ratio_of_caps = Number((capital_letters / amount_of_letters).toFixed(2))
  sampleObj.ratio = ratio_of_caps
  console.log(sample + ' - caps: ' + capital_letters + ' - ratio of caps: ' + ratio_of_caps)
})

function find_closest_point (points, find) {
  var lowest = {point: null, diff: 10000}

  points.forEach(function (point) {
    var difference = Math.abs(find.ratio - point.point)
    if (difference < lowest.diff) {
      lowest.point = point
      lowest.diff = difference
    }
  })

  return lowest.point
}

function avg (vals) {
  var total = 0

  vals.forEach(function (val) {
    total += val.ratio
  })

  return Number((total / vals.length).toFixed(2))
}

function find_average_of_assignments (samples, point) {
  var are_assigned_to_point = []

  samples.forEach(function (sample) {
    if (sample.last_assignment === point) {
      are_assigned_to_point.push(sample)
    }
  })

  var average = avg(are_assigned_to_point)
  console.log('AVERAGE FOR ' + point.name + ': ' + average)

  are_assigned_to_point.forEach(function (asg) {
    console.log(asg.text + ': ' + asg.ratio)
  })

  return average
}

var iteration = 1
function kmean (point1Val, point2Val) {
  if (iteration > 100) return

  var assignment_has_not_changed = true

  var point1 = {name: "Caps guy", point: point1Val}
  var point2 = {name: "Nocaps guy", point: point2Val}

  console.log('K Means iteration ' + iteration + '. Point 1: ' + point1.point + ', Point 2: ' + point2.point)

  samples.forEach(function (sample) {
    var closest_point = find_closest_point([point1, point2], sample)
    console.log('Closest point to ' + sample.text + ': ' + closest_point.name)

    if (!sample.last_assignment) sample.last_assignment = {name: "w"}
    if (closest_point.name !== sample.last_assignment.name) assignment_has_not_changed = false
    sample.last_assignment = closest_point
  })

  var average1 = find_average_of_assignments(samples, point1)
  var average2 = find_average_of_assignments(samples, point2)

  if (assignment_has_not_changed) {
    print_final_results()
  } else {
    iteration++
    kmean(average1, average2)
  }
}

function print_final_results() {
  console.log('=========================')
  console.log('FINAL RESULTS. complete in ' + iteration + ' iterations')

  samples.forEach(function (sample) {
    console.log(sample.text + '\t was written by ' + sample.last_assignment.name)
  })
}


kmean(1, 0)
