---
DATE: 16/6/2024
TITLE: ATTRACTORS
DESCRIPTION: A collection of different attractors where you will find the equations that describe them as well as the python code for plotting them
SRC: attractors.mp4
---
In this article I will show you different interesting **attractors** that I will keep updating. These are usually found in a particular set of solutions for a system of differential equations. An attractor is a set of states toward which a system tends to evolve. The math behind can be quite involved, so for now, I'm just going to present the fixed points and how you can obtain them.

All of the attractors were plotted with **matplotlib** and the solution of the differential equations where obtained using **scipy**. Here I give you a code snippet on how you can solve the Lorenz system for *n* amount of 3 random intital conditions.

```python
from scipy.integrate import solve_ivp
import numpy as np

t_max = 100
t_per_second = 100

# DIFFERENTIAL EQUATION PARAMETERS
a = 10 # sigma
b = 28 # rho
c = 8/3 # beta

# INITIAL CONDITIONS
n_initial_conditions = 1
s_0 = []
for j in range(n_initial_conditions):
    s_0.append([np.random.random(),np.random.random(),np.random.random()])

# DIFFERENTIAL EQUATION LORENZ
def dsdt(t,S):
    x, y, z = S
    return [a*(y - x), x*(b-z) - y, x*y - c*z]

# SOLVER FOR N INITIAL CONDITIONS
t = np.linspace(0, t_max, t_max*t_per_second)
solutions = []
for j in range(n_initial_conditions):
    solutions.append(solve_ivp(dsdt, [0,t_max], s_0[j], t_eval=t))
```

## LORENZ

The most famous strange attractor, studied by Edward Lorenz in 1963, related to a problem in meteorology. The attractor is described by the solution of the following set of differential equations. The fixed points \\((p\_0,\, p\_1,\, p\_2)\\) and the parameters where it shows chaotic behaviour are given.

<div class="row">
    <div class="col-lg-6 align-self-center">
        <div class="math-div">
                $$\begin{align}
                \frac{\mathrm{d} x}{\mathrm{d} t} & = \sigma (y-x),\quad \sigma = 10\\[0.5em]
                \frac{\mathrm{d} y}{\mathrm{d} t} & = x (\rho - z) - y,\quad \rho = 28\\[0.5em]
                \frac{\mathrm{d} z}{\mathrm{d} t} & = xy - \beta z,\quad \beta = \frac{8}{3}\\[2em]
                p_0 & = (0,0,0)\\[0.5em]
                p_1 & = \left(\sqrt{\beta(\rho-1)},\, \sqrt{\beta(\rho-1)},\, \rho-1 \right) \\[0.5em]
                p_2 & = \left(-\sqrt{\beta(\rho-1)},\, -\sqrt{\beta(\rho-1)},\, \rho-1 \right)
                \end{align}$$
        </div>
    </div>
    <div class="col-lg-6 align-self-center">
        <img src="images/simulations/attractors/lorenz_points.png">
    </div>
</div>

To find the fixed points, we just set the derivatives to be equal to 0.

<div class="math-div">

$$\begin{align}
0 & = \sigma (y-x) \Longleftrightarrow y = x \tag{1}\\[1em]
0 & = xy - \beta z \Longleftrightarrow z = \frac{xy}{\beta} \,\overbrace{\Longleftrightarrow}^{\Large{(1)}}\, z = \frac{x^2}{\beta} \tag{2}\\[1em]
0 & = x (\rho - z) - y \overbrace{\Longleftrightarrow}^{\Large{(1)(2)}} 0 = x (\rho - \frac{x^2}{\beta}) - x \Longleftrightarrow 0 = x\left(\rho - \frac{x^2}{\beta} - 1\right) \tag{3}\\[1em]
x & = 0 \Longrightarrow y = 0,\, z = 0\\
\rho - \frac{x^2}{\beta} - 1 & = 0 \Longleftrightarrow  x^2 = \beta(\rho - 1) \Longleftrightarrow x = \pm \sqrt{\beta(\rho - 1)} \Longrightarrow y = \pm \sqrt{\beta(\rho - 1)},\, z = (\rho - 1)
\end{align}$$

</div>

## RÖSSLER

Another famous attractor that shows chaotic behaviour for certain parameters, like the ones used for the plot. Below you have the set of differential equations that describe it as well as the fixed points \\((p\_1,\, p\_2)\\)

<div class="row">
    <div class="col-lg-7 align-self-center">
        <div class="math-div">
            $$\begin{align}
            \frac{\mathrm{d} x}{\mathrm{d} t} & = - y - z,\quad a = 0.1\\[0.5em]
            \frac{\mathrm{d} y}{\mathrm{d} t} & = x + ay,\quad b = 0.1\\[0.5em]
            \frac{\mathrm{d} z}{\mathrm{d} t} & = b + z(x-c),\quad c = 14\\[2em]
            p_1 & = \left(\frac{c - \sqrt{c^2-4ab}}{2},\, \frac{-c + \sqrt{c^2-4ab}}{2a},\, \frac{c - \sqrt{c^2-4ab}}{2a} \right) \\[0.5em]
            p_2 & = \left(\frac{c + \sqrt{c^2-4ab}}{2},\, \frac{-c - \sqrt{c^2-4ab}}{2a},\, \frac{c + \sqrt{c^2-4ab}}{2a} \right)
            \end{align}$$
        </div>
    </div>
    <div class="col-lg-5 align-self-center">
        <img src="images/simulations/attractors/rossler_points.png">
    </div>
</div>

To find the fixed points, we just set the derivatives to be equal to 0.

<div class="math-div">

$$\begin{align}
0 & = -y -z \Longleftrightarrow z = -y \tag{4}\\[0.5em]
0 & = x + ay \Longleftrightarrow x = -ay \tag{5}\\[0.5em]
0 & = b + z(x-c) \Longleftrightarrow 0 = b + zx-cz \overbrace{\Longleftrightarrow}^{\Large{(4)(5)}} 0 = b + ay^2 + cy \tag{6}\\[0.5em]
y & = \frac{-c \pm \sqrt{c^2-4ab}}{2a} \Longrightarrow x = \frac{c \mp \sqrt{c^2-4ab}}{2},\, z = \frac{c \mp \sqrt{c^2-4ab}}{2a}\\
\end{align}$$

</div>

## CHUA'S

This attractor comes from a simple electronic circuit that shows chaotic behavior with certain parameters like the ones below. By plotting the \\(x\\), \\(y\\) and \\(z\\) output signals of the circuit using a oscilloscope you can see this pattern. Below you have the equations that describe it as well as the equilibrium points \\((p\_0,\,p\_1,\, p\_2)\\)

<div class="row">
    <div class="col-lg-7 align-self-center">
        <div class="math-div">
            $$\begin{align}
            \frac{\mathrm{d} x}{\mathrm{d} t} & = a(y - x - f(x)),\quad a = 15.6\\[0.5em]
            \frac{\mathrm{d} y}{\mathrm{d} t} & = x - y + z,\quad b = 28\\[0.5em]
            \frac{\mathrm{d} z}{\mathrm{d} t} & = -by,\quad c = -0.714\\[0.5em]
            f(x) & = cx+0.5\cdot(d-c)\left(|x+1|-|x-1|\right),\quad d = -1.143\\[2em]
            p_0 & = (0,\, 0,\, 0) \\[0.5em]
            p_1 & = \left(\frac{d-c}{1+c},\, 0,\, \frac{c-d}{1+c} \right) \\[0.5em]
            p_2 & = \left(\frac{c-d}{1+c},\, 0,\, \frac{d-c}{1+c} \right)
            \end{align}$$
        </div>
    </div>
    <div class="col-lg-5 align-self-center">
        <img src="images/simulations/attractors/chua_points.png">
    </div>
</div>

To find the fixed points, we just set the derivatives to be equal to 0.

<div class="math-div">
    $$\begin{align}
    0 & = -by \Longleftrightarrow y = 0 \tag{7}\\[0.5em]
    0 & = a(y - x - f(x)) \,\overbrace{\Longleftrightarrow}^{\Large{(7)}}\, 0 = a(-x -f(x)) \Longleftrightarrow x = -f(x) \tag{8}\\[0.5em]
    0 & = x - y + z \overbrace{\Longleftrightarrow}^{\Large{(7)(8)}} 0 = -f(x) + z \Longleftrightarrow z = f(x) = -x \tag{9}\\[1em]
    \text{if} \,\, x & < -1:\\[0.5em]
    f(x) & = cx+0.5\cdot(d-c)\left[-(\bcancel{x}+1)+(\bcancel{x}-1)\right] = cx+0.5\cdot(d-c)\cdot(-2)=cx-d+c\\[0.5em]
    x & = -f(x) = -cx + d - c \Longleftrightarrow (1+c)x = d - c \Longleftrightarrow x = \frac{d - c}{1+c} \Longrightarrow y = 0,\, z = \frac{c - d}{1+c}\\[1em]
    \text{if} \,\, -1 & < x < -1:\\[0.5em]
    f(x) & = cx+0.5\cdot(d-c)\left[(x+\bcancel{1})+(x-\bcancel{1})\right] = cx+0.5\cdot(d-c)\cdot2x=cx+(d-c)x=dx\\[0.5em]
    x & = -f(x) = -dx \Longleftrightarrow x = 0 \Longrightarrow y = 0,\, z = 0\\[1em]
    \text{if} \,\, x & > 1:\\[0.5em]
    f(x) & = cx+0.5\cdot(d-c)\left[\bcancel{x}+1-(\bcancel{x}-1)\right] = cx+0.5\cdot(d-c)\cdot 2=cx+d-c\\[0.5em]
    x & = -f(x) = -cx - d + c \Longleftrightarrow (1+c)x = c - d \Longleftrightarrow x = \frac{c - d}{1+c} \Longrightarrow y = 0,\, z = \frac{d - c}{1+c}\\
    \end{align}$$
</div>


## RABINOVICH-FABRIKANT

These are a set of three coupled ordinary differential equations that exhibit chaotic and non chaotic behaviour for certain values of the parameters. For the plot, I used the parameters given below. The set of differential equations has 5 equilibrium points \\((p\_0,\,p\_1,\,p\_2,\, p\_3,\, p\_4)\\)

<div class="row">
    <div class="col-lg-7 align-self-center">
        <div class="math-div">
            $$\begin{align}
            \frac{\mathrm{d} x}{\mathrm{d} t} & = y(z - 1 + x^2) + \gamma x,\quad \gamma = 0.87\\[0.5em]
            \frac{\mathrm{d} y}{\mathrm{d} t} & = x(3z+1-x^2) + \gamma y\\[0.5em]
            \frac{\mathrm{d} z}{\mathrm{d} t} & = -2z(\alpha +xy),\quad \alpha = 1.1\\[0.5em]
            q_\pm & = \sqrt{\frac{-1\pm\sqrt{1+\frac{3}{4}\gamma^2-\alpha\gamma}}{2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)}} \\[0.5em]
            p_0 & = (0,\, 0,\, 0) \\[0.5em]
            p_1 & = \left(q_+,\, -\frac{\alpha}{q_+},\, q_+^2\left(\frac{\gamma}{\alpha}-1\right)+1\right) \\[0.5em]
            p_2 & = \left(q_-,\, -\frac{\alpha}{q_-},\, q_-^2\left(\frac{\gamma}{\alpha}-1\right)+1\right) \\[0.5em]
            p_3 & = \left(-q_+,\, \frac{\alpha}{q_+},\, q_+^2\left(\frac{\gamma}{\alpha}-1\right)+1\right) \\[0.5em]
            p_4 & = \left(-q_-,\, \frac{\alpha}{q_-},\, q_-^2\left(\frac{\gamma}{\alpha}-1\right)+1\right) \\
            \end{align}$$
        </div>
    </div>
    <div class="col-lg-5 align-self-center">
        <img src="images/simulations/attractors/rabinovich-fabrikant_points.png">
    </div>
</div>

To find the fixed points, we just set the derivatives to be equal to 0.

<div class="math-div">

$$\begin{align}
0 & = y(z - 1 + x^2) + \gamma x \tag{10}\\[0.5em]
0 & = x(3z+1-x^2) + \gamma y \tag{11}\\[0.5em]
0 & = -2z(\alpha +xy) \Longleftrightarrow z = 0 \lor  \alpha + xy = 0 \tag{12}\\[0.5em]
\text{if} \,\, z & = 0:\\[0.5em]
(10)\cdot x \Longrightarrow 0\cdot x & = \left(y\left(z - 1 + x^2\right)+ \gamma x\right)x \Longleftrightarrow 0 = -xy\left(1 - x^2\right)+ \gamma x^2 \tag{13}\\[0.5em]
(11)\cdot y \Longrightarrow 0\cdot y & = \left(x\left(3z + 1 - x^2\right)+ \gamma y\right)y \Longleftrightarrow 0 = xy\left(1 - x^2\right)+ \gamma y^2 \tag{14}\\[0.5em]
(13)\,+\,(14) \Longrightarrow 0 &= \cancel{-xy\left(1 - x^2\right)}+ \gamma x^2 + \cancel{xy\left(1 - x^2\right)}+ \gamma y^2 = \gamma\left(x^2 + y^2\right) \Longrightarrow x = 0,\, y = 0 \\[1em]
\text{if} \,\,\alpha +xy & = 0,\, \alpha \neq 0 \Longrightarrow x \neq 0 \wedge y \neq 0: \\[0.5em]
xy & = -\alpha \Longrightarrow y = -\frac{\alpha}{x} \Longleftrightarrow x = -\frac{\alpha}{y} \tag{15}\\[0.5em]
(10)\cdot y \Longrightarrow 0\cdot y & = \left(y\left(z - 1 + x^2\right)+ \gamma x\right)y \Longleftrightarrow 0 = y^2z - y^2 + x^2y^2 - \gamma xy \,\overbrace{\Longleftrightarrow}^{{\Large{(15)}}}\,\\[0.5em]
0 & = \frac{\alpha^2}{x^2}z - \frac{\alpha^2}{x^2} + \alpha^2 - \alpha\gamma \Longleftrightarrow \cancel{\alpha}\gamma - \alpha^\cancel{2} = \frac{\alpha^\cancel{2}}{x^2}(z - 1) \Longleftrightarrow \\[0.5em] 
z & = x^2\left(\frac{\gamma}{\alpha} - 1\right) + 1 \tag{16} \\[0.5em]
(11)\cdot x \Longrightarrow 0\cdot x & = \left(x\left(3z + 1 - x^2\right)+ \gamma y\right)x \Longleftrightarrow 0 = 3x^2z + x^2 - x^4 - \gamma xy \,\overbrace{\Longleftrightarrow}^{{\Large{(15)(16)}}}\,\\[0.5em]
0 & = 3{x^2}\left(x^2\left(\frac{\gamma}{\alpha} - 1\right) + 1\right) + x^2 - x^4 - \alpha\gamma \\[0.5em] 
0 & = {x^4}\left(3\frac{\gamma}{\alpha}-4\right) + 4x^2 - \alpha\gamma,\quad x^2 = w \Longleftrightarrow 0 = {w^2}\left(3\frac{\gamma}{\alpha}-4\right) + 4w - \alpha\gamma\\[0.5em] 
w & = \frac{-4 \pm\sqrt{4^2-4(-\alpha\gamma)\left(3\frac{\gamma}{\alpha}-4\right)}}{2\left(3\frac{\gamma}{\alpha}-4\right)} =  \frac{-4 \pm\sqrt{4^2+4\alpha\gamma\left(3\frac{\gamma}{\alpha}-4\right)}}{4\cdot 2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)} \\[0.5em]
w & = \frac{-1 \pm\sqrt{1+\alpha\gamma\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)}}{2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)}= \frac{-1\pm\sqrt{1+\frac{3}{4}\gamma^2-\alpha\gamma}}{2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)},\quad x = \pm \sqrt{w} \\[0.5em]
x & = \pm\sqrt{\frac{-1\pm\sqrt{1+\frac{3}{4}\gamma^2-\alpha\gamma}}{2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)}} \\[0.5em]
y & = \frac{\alpha}{\mp\sqrt{\frac{-1\pm\sqrt{1+\frac{3}{4}\gamma^2-\alpha\gamma}}{2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)}}}\\[0.5em]
z & = \frac{-1\pm\sqrt{1+\frac{3}{4}\gamma^2-\alpha\gamma}}{2\left(\frac{3}{4}\frac{\gamma}{\alpha}-1\right)}\left(\frac{\gamma}{\alpha} - 1\right) + 1
\end{align}$$

</div>

<h2 class="text-center mt-5"> GALLERY</h2> 
<div class="row">
    <div class="col-lg-6">
        <img src="images/simulations/attractors/lorenz_plot.mp4" alt="0-control">
        <p class="text-center"> Lorenz chaotic behaviour</p> 
        <div class="math-div">$$ \sigma = 10,\,\rho = 330,\,\beta = \frac{8}{3} $$</div>
    </div>
    <div class="col-lg-6">
        <img src="images/simulations/attractors/rossler_plot.mp4" alt="0-control">
        <p class="text-center"> Rössler chaotic behaviour</p> 
        <div class="math-div">$$ a = 0.1,\,b = 0.1,\,c = 14 $$</div>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <img src="images/simulations/attractors/chua_plot.mp4" alt="0-control">
        <p class="text-center"> Chua's chaotic behaviour</p>
        <div class="math-div">$$ a = 15.6,\, b = 28,\, c = -0.714,\, d = -1.143 $$</div>
    </div>
    <div class="col-lg-6">
        <img src="images/simulations/attractors/rabinovich-fabrikant_plot.mp4" alt="0-control">
        <p class="text-center"> Rabinovich-Fabrikant chaotic behaviour</p> 
        <div class="math-div">$$ \gamma = 0.87,\,\alpha = 1.1,\, x_0 = -1,\, y_0 = 0,\, z_0 = 0.5 $$</div>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <img src="images/simulations/attractors/lorenz_plot_cycle.mp4" alt="0-control">
        <p class="text-center"> Lorenz limit cycle behaviour</p> 
        <div class="math-div">$$ \sigma = 10,\,\rho = 330,\,\beta = \frac{8}{3} $$</div>
    </div>
    <div class="col-lg-6">
        <img src="images/simulations/attractors/rossler_plot_cycle.mp4" alt="0-control">
        <p class="text-center"> Rössler periodic behaviour</p> 
        <div class="math-div">$$ a = 0.1,\,b = 0.1,\,c = 4 $$</div>
    </div>
</div>
<div class="row">
    <div class="col-lg-6">
        <img src="images/simulations/attractors/rabinovich-fabrikant_plot_cycle.mp4" alt="0-control">
        <p class="text-center"> Rabinovich-Fabrikant limit cycle behaviour</p>
        <div class="math-div">$$ \gamma = 0.1,\,\alpha = 0.14 $$</div>
    </div>
    <div class="col-lg-6">
        <img src="images/simulations/attractors/rabinovich-fabrikant_plot_rare.mp4" alt="0-control">
        <p class="text-center"> Rabinovich-Fabrikant particular solution</p> 
        <div class="math-div">$$ \gamma = 0.1,\,\alpha = 0.05,\, x_0 = 0.1,\, y_0 = -0.1,\, z_0 = 0.1 $$</div>
    </div>
</div>