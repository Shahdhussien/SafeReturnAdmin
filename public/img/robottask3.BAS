MainProgram:
gosub DrawLine
gosub InitializeRobot
rforward 10
rspeed 8
gosub FollowLine
End
=========

InitializeRobot:
rLocate 200,71,-90
rInvisible Green
Return
=========

DrawLine:
linewidth 4
setcolor Green
gotoxy 170,71
lineto 160,72
lineto 145,80
lineto 140,90
lineto 130,100
lineto 125,110
lineto 130,200
lineto 600,450
lineto 600,400
lineto 650,200
lineto 500,350
lineto 500,550
lineto 550,550
lineto 550,200
lineto 200,400
Return
=========

FollowLine:
LastTurn = 1

while true
    if rSense() & 1
        rTurn 10
        LastTurn = 10
    endif

    if rSense() & 4
        rTurn -10
        LastTurn = -10
    endif

    rForward 3

    if rSense() = 0
        rTurn 4 * LastTurn
    endif
wend

Return
