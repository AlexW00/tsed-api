// returns a random node
MATCH (a)-[]->(t) 
RETURN a, rand() as r
ORDER BY r