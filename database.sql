/*!40101 SET NAMES utf8 */;
/*!40014 SET FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET SQL_NOTES=0 */;
DROP TABLE IF EXISTS recipe;
CREATE TABLE `recipe` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `recipe_name` varchar(50) DEFAULT NULL,
  `ingredients` varchar(50) DEFAULT NULL,
  `catagory` varchar(50) DEFAULT NULL,
  `instructions` varchar(100) DEFAULT NULL,
  `cooking_time` varchar(50) DEFAULT NULL,
  `rating` varchar(50) DEFAULT NULL,
  `user_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE `users` (
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `pass_word` varchar(50) DEFAULT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO recipe(id,recipe_name,ingredients,catagory,instructions,cooking_time,rating,user_id) VALUES('23','\'African Sweet Potato Stew\'','\'VegetablesGrains\'','\'Soups & Stews\'','\'Broome County CCE\'','\'25 minutes\'','\'1\'','\'web\''),('27','\'Apple Cinnamon Wrap Roll\'','\'FruitGrains\'','\'Snacks\'','\'Choose Health:Food, Fun, and Fitness Curriculum (CHFFF)\'','\'20-30 minutes\'','\'4\'','\'web\''),('28','\'Apple Corn Chili(English & Spanish)\'','\'Vegetables\'','\'Soups & Stews\'','\'USDA MyPlate\'','\'45 minutes\'','\'4\'','\'web\''),('29','\'Apple Fruit Salad\'','\'Fruit\'','\'Salads\'','\'Teen Cuisine Cookbook\'','\'10 minutes\'','\'2\'','\'web\''),('30','\'Apple salad\'','\'FruitVegetables\'','\'Salads\'','\'Cattaraugus County CCE\'','\'10 minutes\'','\'4\'','\'web\''),('38','\'Cake\'','\'cream\'','\'desert\'','\'enjoyyy\'','\'2 hr\'','\'5\'','\'manishapanchal5591@gmail.com\''),('41','\'tea\'','\'milk,sugar\'','\'drink\'','\'ghjk\'','\'10 min\'','\'6\'','\'manishapanchal5591@gmail.com\''),('42','\'burger\'','\'vegetables\'','\'snacks\'','\'enjoy\'','\'20 min\'','\'5\'','\'manisha.213004@maimt.com\'');
INSERT INTO users(username,email,pass_word,role) VALUES('\'sakshi\'','\'manisha.213004@maimt.com\'','\'Sakshi@123\'','\'user\''),('\'manisha\'','\'manishapanchal5591@gmail.com\'','\'M@ni2025\'','\'admin\'');