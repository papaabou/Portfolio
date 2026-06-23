from pygame.locals import QUIT
import pygame
import sys
import random

pygame.init()

#Initialisation variable pour taille fenetre
sw, sh = 800, 800

block_size = 50
FONT = pygame.font.SysFont("black", block_size*2)

# Initialisation du score
score = FONT.render("1", True, "white")
score_rect = score.get_rect(center = (sw/2, sh/20))

# generation fenetre
fenetre = pygame.display.set_mode((800, 800))
pygame.display.set_caption("Snake")
clock = pygame.time.Clock()

#creation instance pomme
class Pomme:
    def __init__(self) :
        self.x = int(random.randint(0, sw)/block_size) * block_size
        self.y = int(random.randint(0, sh)/block_size) * block_size
        self.rect = pygame.Rect(self.x, self.y, block_size, block_size)
    def update(self) :
        pygame.draw.rect(fenetre, 'red', self.rect)

#creation instance joueur(le serpent/snake)
class Joueur(pygame.sprite.Sprite) :
    def __init__(self) :
        super().__init__()
        self.x, self.y = block_size, block_size
        self.xdir = 1
        self.ydir = 0
        self.head = pygame.Rect(self.x, self.y, block_size, block_size)
        self.body = [pygame.Rect(self.x - block_size, self.y, block_size, block_size)]
        self.dead = False
    
    def update(self):
        for square in self.body :
            if self.head.x == square.x and self.head.y == square.y :
                self.dead = True
            if self.head.x not in range(0, sw) or self.head.y not in range(0, sh) :
                self.dead = True
        if self.dead:
            self.x, self.y = block_size, block_size
            self.xdir = 1
            self.ydir = 0
            self.head = pygame.Rect(self.x, self.y, block_size, block_size)
            self.body = [pygame.Rect(self.x - block_size, self.y, block_size, block_size)]
            self.dead = False
            apple = Pomme()
        self.body.append(self.head)
        for i in range(len(self.body)-1):
            self.body[i].x, self.body[i].y = self.body[i+1].x, self.body[i+1].y
        self.head.x += self.xdir * block_size
        self.head.y += self.ydir * block_size
        self.body.remove(self.head)

#création menu
def menu():
    for x in range(325, 455):
        for y in range(325, 475):
            pygame.draw.rect(fenetre, (0, 100, 200), 150, 1)

#Création grille
def drawGrid():
    for x in range(0, sw, block_size):
        for y in range(0, sh, block_size):
            rect = pygame.Rect(x, y, block_size, block_size)
            pygame.draw.rect(fenetre, (100, 100, 100), rect, 1)
drawGrid()

snake = Joueur()
apple = Pomme()

# boucle maintien fenetre
while True:
    for event in pygame.event.get() :
        #si joueur ferme fenetre
        if  event.type == pygame.QUIT :
            pygame.quit()
            sys.exit()
        #si flèche presse
        if event.type == pygame.KEYDOWN :
            if event.key == pygame.K_DOWN and snake.ydir == 0 :
                snake.ydir = 1
                snake.xdir = 0
            elif event.key == pygame.K_UP  and snake.ydir == 0 :
                snake.ydir = -1
                snake.xdir = 0
            elif event.key == pygame.K_RIGHT and snake.xdir == 0 :
                snake.ydir = 0
                snake.xdir = 1
            elif event.key == pygame.K_LEFT and snake.xdir == 0 :
                snake.ydir = 0
                snake.xdir = -1
    snake.update()

    fenetre.fill('black')
    drawGrid()

    apple.update()

    score = FONT.render(f"{len(snake.body) + 1}", True, "white")
    pygame.draw.rect(fenetre, "green", snake.head)

    for square in snake.body:
        pygame.draw.rect(fenetre, 'green', square)

    fenetre.blit(score, score_rect)

    if snake.head.x == apple.x and snake.head.y == apple.y :
        snake.body.append(pygame.Rect(square.x, square.y, block_size, block_size))
        apple = Pomme()
    
    # Update the display
    pygame.display.update()
    clock.tick(9.775)
