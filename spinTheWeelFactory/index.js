function spinWheel(wedges) {
    // Calculate the total weight of all wedges
    let totalWeight = 0;
    for (let i = 0; i < wedges.length; i++) {
      totalWeight += wedges[i].weight;
    }
    
    // Generate a random number between 0 and the total weight
    let spin = Math.random() * totalWeight;
    
    // Loop through the wedges and subtract each wedge's weight from the spin
    // until the spin is less than or equal to 0
    for (let i = 0; i < wedges.length; i++) {
      spin -= wedges[i].weight;
      if (spin <= 0) {
        return wedges[i].reward;
      }
    }
  }

  const wedges = [
    { reward: "500 points", weight: 1 },
    { reward: "200 points", weight: 3 },
    { reward: "1000 points", weight: 2 },
    { reward: "lose a turn", weight: 1 },
    { reward: "5000 points", weight: 1 },
  ];

  for(let i = 0; i < 10; i++){
    console.log(`reward <${i}>: ${spinWheel(wedges)}`);
  }
