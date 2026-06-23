from pygame.locals import QUIT
import pygame
import sys
import random

pygame.init()

# Création fenètre
fenetre = pygame.display.set_mode((1280, 720))
pygame.display.set_caption("Dinosaure Google")

clock = pygame.time.Clock()

#sol image et animation
ground = pygame.image.load("assets/ground.png")
ground = pygame.transform.scale(ground, (1280, 20))
ground_x = 0
ground_rect = ground.get_rect(center = (640,400))

#Classes
class Dinosaure(pygame.sprite.Sprite):
    def __init__(self, x_pos, y_pos):
        super().__init__()
        self.x = x_pos
        self.y = y_pos
        self.running_sprite = []
        self.ducking_sprite = []

        self.running_sprite.append(pygame.transform.scale(pygame.image.load("assets/Dino1.png"), (80, 100)))
        self.running_sprite.append(pygame.transform.scale(pygame.image.load("assets/Dino2.png"), (80, 100)))
        self.ducking_sprite.append(pygame.transform.scale(pygame.image.load("assets/DinoDucking1.png"), (110, 60)))
        self.ducking_sprite.append(pygame.transform.scale(
            pygame.image.load("assets/DinoDucking2.png"), (110, 60)))

        self.current_image = 0
        self.image = self.running_sprite[self.current_image]
        self.rect = self.image.get_rect(center = (self.x, self.y))
        
        self.velocity = 50
        self.gravity = 4.5
        self.ducking = False
    def update(self):
        self.animate()
        self.apply_gravity()

    def animate(self):
        self.current_image += 0.05
        if self.current_image > 2:
            self.current_image = 0
        self.image = self.running_sprite[int(self.current_image)]
        if self.ducking:
            self.image = self.ducking_sprite[int(self.current_image)]
        else:
            self.image = self.running_sprite[int(self.current_image)]

    def duck(self):
        self.ducking = True
        self.rect.centery = 380

    def unduck(self):
        self.ducking = False
        self.rect.centery = 360
    
    def apply_gravity(self):
        if self.rect.centery <= 360:
            self.rect.centery += self.gravity
    
    def jump(self):
        if self.rect.centery >= 360 :
            while self.rect.centery - self.velocity > 40:
                self.rect.centery -= 1

#Variables
game_speed = 5

dino = Dinosaure(50, 360)

dino_group = pygame.sprite.GroupSingle()
dino_group.add(dino)



# boucle maintien fenetre
while True:
    keys = pygame.key.get_pressed()

    if keys[pygame.K_DOWN]:
        dino.duck()
    else :
        if dino.ducking:
            dino.unduck()

    for event in pygame.event.get() :
        #si joueur ferme fenetre
        if  event.type == pygame.QUIT :
            pygame.quit()
            sys.exit()
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_SPACE or event.key == pygame.K_UP:
                dino.jump()
         
    fenetre.fill("white")

    dino_group.update()
    dino_group.draw(fenetre)

    game_speed += 0.0005

    ground_x -= 1

    fenetre.blit(ground, (ground_x, 360))
    fenetre.blit(ground, (ground_x + 1280, 360))

    if ground_x <= -1280:
         ground_x = 0
    
    pygame.display.update()
    clock.tick(120)