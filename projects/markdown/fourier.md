---
DATE: 10/5/2024
TITLE: FOURIER SERIES
DESCRIPTION: A tkinter app made in python that allows you to draw curves that are later converted to an SVG or import a .svg or .csv file directly. The paths of the SVG and functions of the CSV are later approximated by the use of Fourier series. You can choose between different settings for the animation and save them as GIFs.
SRC: fourier-app.gif
---
## The general idea

First of all, I wanted to make an app to be able to showcase the beauty of **Fourier series**. I have known about them since a while ago, but after watching again the video of 3Blue1Brown about this topic, I finally got the motivation to really try to recreate those cool animations you can see online. 

The app is pretty simple, you have three options: **"Draw SVG"**, **"Import SVG"** and **"Import CSV"**. If you choose the first one, you can draw on a canvas that later saves the drawing as an SVG. This SVG is later parsed to get the functions that define the different curves. If you decide to import the SVG, you are just presented with a file selection menu where you select the SVG that's later previewed. Last but not least, "Import CSV" allows you to import a CSV with real and complex functions where you can choose which function to approximate.

All of these options give you the freedom to choose the *FPS* (frames per second), the amount of *frames*, the *precision* of the **Fourier coefficients** and *N* which refers to the amount of coefficients. After the functions are calculated, you are presented with a live-plot made with *matplotlib* that tries to mantain a steady framerate. However, this is not always possible so that's why you can save the animation as a GIF to later view it without any FPS drops.

## The math

Although the math used is pretty straight foward, I should explain how does it work. So, what's a **Fourier series**? Well, it's an expansion of a function that consists of a sum of trigonometric functions (cosines and sines in general). There are different equivalent forms to represent them. The one used by the app is the exponential one because it's easier to use while using complex functions, which happens to be how the app describes the 2D curves present on the SVGs. 

So the exponential one is described as follows, where \\(N\rightarrow\infty\\) :
<div class="math-div">

$$f(t)=\sum_{n\,=\,-N}^{N} C_n{e}^{i2\pi n\frac{t}{T}}$$  

$$C_n=\frac{\langle f(t), e^{-i2\pi n\frac{t}{T}} \rangle}{{\big\lVert e^{-i2\pi n\frac{t}{T}} \big\rVert}^2}=\frac{1}{T}\int_{T}^{} f(t)e^{-i2\pi n\frac{t}{T}}\,dt$$

</div>
Where \\(f(t)\\) is the function we are going to expand as a **Fourier series**. \\(C\_n\\) are the **Fourier coefficients** and \\(T\\) is the period of the function. This representation allow us to use it for both real and complex valued functions really easily. 

Fourier series are really useful for solving some partial differential equations like the Laplace equation \\((\nabla u= 0)\\), to have a continuous representation of a function, they provide an easier way to evaluate really complex function and so many other uses besides pure math applications. 

Due to the fact that we are not using \\(\infty\\) terms when we calculate the function, some imprecision errors will be made. Also, because of how the code is implemented, the integral is calculated numerically. Thus, if we are using a real function we just use the \\(\operatorname{\mathbb{R}e}(f(t))\\) and if we are using a complex function we take the result as \\(\operatorname{\mathbb{R}e}(f(t)) + i\,\operatorname{\mathbb{I}m}(f(t))\\).

Here is a *snippet* of the implementation of the numerical integration for the **Fourier coefficients** inside the app:

```python
a = start of interval
b = end of interval
K = amount of subintervals
T = period of the function
n = index of Fourier coefficient
delta_t = T/K

# CHOOSE FUNCTION FOR SVG OR CSV AND RETURN THE EVALUATION ON THAT t
def type_of_function(t, function, b):
    if type_of_curve == "csv":
        try:
            return csv_parser.evaluate_curve(t, function, b)
        except:
            regrid_main_items(window, False)
            Alert(window, "An error occurred while parsing CSV file", 3000)
    elif type_of_curve == "svg":
        try:
            return svg_parser.evaluate_svg(t, function, b) 
        except:
            regrid_main_items(window, False)
            Alert(window, "An error occurred while parsing SVG file", 3000)

# NUMERICAL INTEGRATION FOR FOURIER COFFICIENTS
def c_n(delta_t, a, b, K, T, n, function):
    c_n = 0
    for j in range(K):
        t = a + delta_t/2 + delta_t*j # MIDPOINT RULE
        c_n = c_n + 1/T*type_of_function(t, function, b)*delta_t*np.e**(-2j*np.pi*n/T*t)
    return c_n

# FOURIER COEFFICIENTS
coefficients = []
for n in range(-N, N+1):
    coefficients.append(c_n(delta_t, a, b, K, T, n, function))
```

Although we are not using the most common representation, the next one shows how to use sines and cosines to expand a function, where \\(N\rightarrow\infty\\) :

<div class="math-div">

$$\begin{align}
f(t) &=a_0 + \sum_{n\,=\,1}^{N}\left(a_n\cos\left(2\pi n\frac{t}{T}\right) + b_n\sin\left(2\pi n\frac{t}{T}\right)\right) \tag{1}\\[1em]
a_0 &=\frac{1}{T}\int_{T}^{} f(t)\,dt \tag{2}\\[1em]
a_n &=\frac{2}{T}\int_{T}^{} f(t)\cos\left(2\pi n\frac{t}{T}\right)\,dt, \quad n \geq 1 \tag{3}\\[1em]
b_n &=\frac{2}{T}\int_{T}^{} f(t)\sin\left(2\pi n\frac{t}{T}\right)\,dt, \quad n \geq 1  \tag{4}
\end{align}$$
</div>

So, why do **Fourier series** work? It's all thanks to the **orthogonality** between cosines and sines, which allow us to use an **orthogonal basis** to expand functions as a sum of cosines and sines. First, we define the inner product of two functions \\((f,g)\\) on an interval \\([a,b]\\) as follows:
<div class="math-div">
$$\begin{align}
\langle f,g \rangle & = \int_{a}^{b}f(t)\cdot\overline{g(t)}\,dt\\[0.5em]
\lVert f \rVert & = \sqrt{\langle f,f \rangle} = \sqrt{\int_{a}^{b}f(t)\cdot\overline{f(t)}\,dt}
\end{align}$$

</div>

*\\(\overline{g(t)}\\) is the conjugate of the function

With this idea in mind, we can show that the next basis is orthogonal in the interval \\(\left[-\frac{T}{2}, \frac{T}{2}\right]\\) by doing the necessary **inner products**:

<div class="math-div">

$$\left\{1, \cos\left(2\pi n\frac{t}{T}\right), \sin\left(2\pi n\frac{t}{T}\right) \right\}\quad n \in \mathbb{N}^{+}$$

</div>

The inner products will be calculated by first checking \\(\left \langle 1\,,\,\cdot \right \rangle\\), then \\(\left \langle \cos\left(2\pi n\frac{t}{T}\right)\,,\,\cdot \right \rangle \\) and finally \\(\left \langle \sin\left(2\pi n\frac{t}{T}\right)\,,\,\cdot \right \rangle \\). Because the basis is made of \\(\infty\\) cosines and \\(\infty\\) sines, we will be using \\(n\\) and \\(m\\) to check the cases when the functions are different. To prove this is an **orthogonal basis**, we must show that the **inner product** between different functions is equal to \\(0\\).

<div class="math-div">

$$\forall\, n \in \mathbb{N}^{+} \wedge \forall\, m \in \mathbb{N}^{+}$$

</div>

<hr style="color:black; height:0.5px" class="mt-1">

<div class="math-div">

$$\begin{align}

\left \langle 1\,,\,1 \right \rangle &= \int_{-\frac{T}{2}}^{\frac{T}{2}}1\cdot1\,dt = t\, \Bigg|_{-\frac{T}{2}}^{\frac{T}{2}} = \frac{T}{2}-\left(-\frac{T}{2}\right)= T \\[1em]
\left \langle 1\,,\,\cos\left(2\pi n\frac{t}{T}\right) \right \rangle &= \int_{-\frac{T}{2}}^{\frac{T}{2}}1\cdot\cos\left(2\pi n\frac{t}{T}\right)\,dt = \frac{T}{2\pi n}\sin\left(2\pi n\frac{t}{T}\right) \Bigg|_{-\frac{T}{2}}^{\frac{T}{2}} = \frac{T}{2\pi n}\left(\sin(\pi n)-\sin(-\pi n)\right)= 0 \tag{5}\\[1em]
\left \langle 1\,,\,\sin\left(2\pi n\frac{t}{T}\right) \right \rangle &= \int_{-\frac{T}{2}}^{\frac{T}{2}}1\cdot\sin\left(2\pi n\frac{t}{T}\right)\,dt = -\frac{T}{2\pi n}\cos\left(2\pi n\frac{t}{T}\right) \Bigg|_{-\frac{T}{2}}^{\frac{T}{2}} = -\frac{T}{2\pi n}\left(\cos(\pi n)-\cos(-\pi n)\right)= 0 \tag{6}
\end{align}$$

</div>
<hr style="color:black; height:0.5px">
<div class="math-div">

$$\begin{align}
\left \langle \cos\left(2\pi n\frac{t}{T}\right)\,,\,1 \right \rangle &= \left \langle 1\,,\,\cos\left(2\pi n\frac{t}{T}\right) \right \rangle= 0 \\[1em]
\left \langle \cos\left(2\pi n\frac{t}{T}\right)\,,\,\cos\left(2\pi m\frac{t}{T}\right) \right \rangle &= \int_{-\frac{T}{2}}^{\frac{T}{2}}\cos\left(2\pi n\frac{t}{T}\right)\cdot\cos\left(2\pi m\frac{t}{T}\right)\,dt \tag{7}\\[1em]
&= \int_{-\frac{T}{2}}^{\frac{T}{2}}\frac{1}{2}\left(\cos\left(2\pi (n+m)\frac{t}{T}\right)+\cos\left(2\pi (n-m)\frac{t}{T}\right)\right)\,dt \\[1em]

&=\begin{cases}
\text{if}\quad n=m: \quad&=\int_{-\frac{T}{2}}^{\frac{T}{2}}\frac{1}{2}\left(\cos\left(4\pi n\frac{t}{T}\right)+1\right)\,dt=\frac{1}{2}\left(\frac{T}{4\pi n}\sin\left(4\pi n\frac{t}{T}\right)+t\right)\Big|_{-\frac{T}{2}}^{\frac{T}{2}} \\[1em] 
&=\frac{1}{2}\left(\frac{T}{4\pi n}(\sin(2\pi n)-\sin(-2\pi n))+\frac{T}{2}-\left(-\frac{T}{2}\right)\right)=\frac{T}{2} \\[1em]
\text{if}\quad n\neq m: \quad &= \frac{T}{4\pi}\left(\frac{\sin\left(2\pi (n+m)\frac{t}{T}\right)}{n+m}+\frac{\sin\left(2\pi (n-m)\frac{t}{T}\right)}{n-m}\right)\Big|_{-\frac{T}{2}}^{\frac{T}{2}}\\[1em]
&=\frac{T}{4\pi}\left(\frac{\sin(\pi(n+m))-\sin(-\pi(n+m))}{n+m}+\frac{\sin(\pi(n-m))-\sin(-\pi(n-m))}{n-m}\right)=0
\end{cases} \\[1em]

\left \langle \cos\left(2\pi n\frac{t}{T}\right)\,,\,\sin\left(2\pi m\frac{t}{T}\right) \right \rangle &= \int_{-\frac{T}{2}}^{\frac{T}{2}}\cos\left(2\pi n\frac{t}{T}\right)\cdot\sin\left(2\pi m\frac{t}{T}\right)\,dt \tag{8}\\[1em]
&= \int_{-\frac{T}{2}}^{\frac{T}{2}}\frac{1}{2}\left(\sin\left(2\pi (n+m)\frac{t}{T}\right)-\sin\left(2\pi (n-m)\frac{t}{T}\right)\right)\,dt\\[1em]

&=\begin{cases}
\text{if}\quad n=m: \quad&=\int_{-\frac{T}{2}}^{\frac{T}{2}}\frac{1}{2}\sin\left(4\pi n\frac{t}{T}\right)\,dt=-\frac{T}{8\pi n}\cos\left(4\pi n\frac{t}{T}\right)\Big|_{-\frac{T}{2}}^{\frac{T}{2}} \\[1em] 
&=-\frac{T}{8\pi n}(\cos(2\pi n)-\cos(-2\pi n))=0 \\[1em]
\text{if}\quad n\neq m: \quad &= -\frac{T}{4\pi}\left(\frac{\cos\left(2\pi (n+m)\frac{t}{T}\right)}{n+m}-\frac{\cos\left(2\pi (n-m)\frac{t}{T}\right)}{n-m}\right)\Big|_{-\frac{T}{2}}^{\frac{T}{2}}\\[1em]
&=-\frac{T}{4\pi}\left(\frac{\cos(\pi(n+m))-\cos(-\pi(n+m))}{n+m}-\frac{\cos(\pi(n-m))-\cos(-\pi(n-m))}{n-m}\right)=0   
\end{cases} \\[2em]

\end{align}$$
</div>

<hr style="color:black; height:0.5px">

<div class="math-div">

$$\begin{align}

\left \langle \sin\left(2\pi n\frac{t}{T}\right)\,,\,1 \right \rangle &= \left \langle 1\,,\,\sin\left(2\pi n\frac{t}{T}\right) \right \rangle= 0 \\[1em]
\left \langle \sin\left(2\pi n\frac{t}{T}\right)\,,\,\cos\left(2\pi m\frac{t}{T}\right) \right \rangle &= \left \langle \cos\left(2\pi m\frac{t}{T}\right)\,,\,\sin\left(2\pi n\frac{t}{T}\right) \right \rangle =0 \\[1em]

\left \langle \sin\left(2\pi n\frac{t}{T}\right)\,,\,\sin\left(2\pi m\frac{t}{T}\right) \right \rangle &= \int_{-\frac{T}{2}}^{\frac{T}{2}}\sin\left(2\pi n\frac{t}{T}\right)\cdot\sin\left(2\pi m\frac{t}{T}\right)\,dt \tag{9}\\[1em]
&= \int_{-\frac{T}{2}}^{\frac{T}{2}}\frac{1}{2}\left(\cos\left(2\pi (n-m)\frac{t}{T}\right)-\cos\left(2\pi (n+m)\frac{t}{T}\right)\right)\,dt\\[1em]

&=\begin{cases}
\text{if}\quad n=m: \quad&=\int_{-\frac{T}{2}}^{\frac{T}{2}}\frac{1}{2}\left(1-\cos\left(4\pi n\frac{t}{T}\right)\right)\,dt= \frac{1}{2}\left(t-\frac{T}{4\pi n}\sin\left(4\pi n\frac{t}{T}\right)\right)\Big|_{-\frac{T}{2}}^{\frac{T}{2}} \\[1em] 
&=\frac{1}{2}\left(\frac{T}{2}-\left(-\frac{T}{2}\right)-\frac{T}{4\pi n}(\sin(2\pi n)-\sin(-2\pi n))\right)=\frac{T}{2}\\[1em]
\text{if}\quad n\neq m: \quad &= \frac{T}{4\pi}\left(\frac{\sin\left(2\pi (n-m)\frac{t}{T}\right)}{n-m}-\frac{\sin\left(2\pi (n+m)\frac{t}{T}\right)}{n+m}\right)\Big|_{-\frac{T}{2}}^{\frac{T}{2}}\\[1em]
&=\frac{T}{4\pi}\left(\frac{\sin(\pi(n-m))-\sin(-\pi(n-m))}{n-m}-\frac{\sin(\pi(n+m))-\sin(-\pi(n+m))}{n+m}\right)=0
\end{cases} \\[1em]
\end{align}$$

</div>

<hr style="color:black; height:0.5px">

With the above results, we show that we have an **orthogonal basis** that can also be converted to an **orthonormal basis** by dividing every function in the basis by their respective **norm**. This means that the **norm** of every function in the basis is going to be equal to \\(1\\). Thus, the orthonormal basis will be:

<div class="math-div">

$$\left\{\frac{1}{T}, \frac{2}{T}\cos\left(2\pi n\frac{t}{T}\right), \frac{2}{T}\sin\left(2\pi n\frac{t}{T}\right) \right\}\quad n \in \mathbb{N}^{+}$$

</div>

With this in mind, we are now able to show how the formulas for the **fourier coefficients** are obtained. First we integrate both sides of the expression \\((1)\\) in the interval \\(\left[-\frac{T}{2}, \frac{T}{2}\right]\\):

<div class="math-div">

$$\begin{align}
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\,dt &= \int_{-\frac{T}{2}}^{\frac{T}{2}}\left(a_0 + \sum_{n\,=\,1}^{N}\left(a_n\cos\left(2\pi n\frac{t}{T}\right) + b_n\sin\left(2\pi n\frac{t}{T}\right)\right)\right)\,dt
\end{align}$$

</div>

Because the Fourier series **converges uniformly**, we can use the fact that the integral of a sum is the sum of the integrals an do the following:

<div class="math-div">

$$\begin{align}
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\,dt &= \int_{-\frac{T}{2}}^{\frac{T}{2}}a_0\,dt+ \sum_{n\,=\,1}^{N}a_n\underbrace{\int_{-\frac{T}{2}}^{\frac{T}{2}}\cos\left(2\pi n\frac{t}{T}\right)\,dt}_{\Large{=\,0 \text{ result of (5)}}} + \sum_{n\,=\,1}^{N}b_n\underbrace{\int_{-\frac{T}{2}}^{\frac{T}{2}}\sin\left(2\pi n\frac{t}{T}\right)\,dt}_{\Large{=\,0 \text{ result of (6)}}} \\[1em]
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\,dt &= \int_{-\frac{T}{2}}^{\frac{T}{2}}a_0\,dt\Longleftrightarrow \int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\,dt = a_0\cdot t\,\Bigg|_{-\frac{T}{2}}^{\frac{T}{2}}=a_0\cdot T \Longleftrightarrow \boxed{\,a_0 =\frac{1}{T}\int_{T}^{} f(t)\,dt\,=\frac{\langle f(t), 1 \rangle}{{\lVert 1 \rVert}^2}}

\end{align}$$

</div>

We got the \\(a\_0\\) coefficient which is the same as \\((2)\\). Now we multiply \\((1)\\) by \\(\cos\left(2\pi k\frac{t}{T}\right)\\), integrate both sides of it in the interval \\(\left[-\frac{T}{2}, \frac{T}{2}\right]\\) and do the same as before to obtain the expression for \\(a\_n\\):

<div class="math-div">

$$\begin{align}
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\cos\left(2\pi k\frac{t}{T}\right)\,dt &= \int_{-\frac{T}{2}}^{\frac{T}{2}}\left(a_0 + \sum_{n\,=\,1}^{N}\left(a_n\cos\left(2\pi n\frac{t}{T}\right) + b_n\sin\left(2\pi n\frac{t}{T}\right)\right)\right)\cos\left(2\pi k\frac{t}{T}\right)\,dt \\[1em]
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\cos\left(2\pi k\frac{t}{T}\right)\,dt &= a_0\underbrace{\int_{-\frac{T}{2}}^{\frac{T}{2}}\cos\left(2\pi k\frac{t}{T}\right)\,dt}_{\Large{=\,0 \text{ result of (5)}}} + \underbrace{\sum_{n\,=\,1}^{N}a_n\int_{-\frac{T}{2}}^{\frac{T}{2}}\cos\left(2\pi n\frac{t}{T}\right)\cos\left(2\pi k\frac{t}{T}\right)\,dt}_{\Large{=\,a_k\cdot\frac{T}{2} \text{ result of (7)}}} \\[1em] &+ \sum_{n\,=\,1}^{N}b_n\underbrace{\int_{-\frac{T}{2}}^{\frac{T}{2}}\sin\left(2\pi n\frac{t}{T}\right)\cos\left(2\pi k\frac{t}{T}\right)\,dt}_{\Large{=\,0 \text{ result of (8)}}} \\[1em]
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\cos\left(2\pi k\frac{t}{T}\right)\,dt &=a_k\cdot\frac{T}{2}\Longleftrightarrow\boxed{\,a_k =\frac{2}{T}\int_{T}^{} f(t)\cos\left(2\pi k\frac{t}{T}\right)\,dt\,=\frac{\big\langle f(t), \cos\left(2\pi k\frac{t}{T}\right) \big\rangle}{{\big\lVert \cos\left(2\pi k\frac{t}{T}\right) \big\rVert}^2}}

\end{align}$$

</div>

Now, we obtained the \\(a\_n\\) coefficient formula and we are just missing the \\(b\_n\\) coefficient formula. To obtain it we just multiply \\((1)\\) by \\(\cos\left(2\pi k\frac{t}{T}\right)\\), integrate both sides of it in the interval \\(\left[-\frac{T}{2}, \frac{T}{2}\right]\\) and do the same as before:

<div class="math-div">

$$\begin{align}
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\sin\left(2\pi k\frac{t}{T}\right)\,dt &= \int_{-\frac{T}{2}}^{\frac{T}{2}}\left(a_0 + \sum_{n\,=\,1}^{N}\left(a_n\cos\left(2\pi n\frac{t}{T}\right) + b_n\sin\left(2\pi n\frac{t}{T}\right)\right)\right)\sin\left(2\pi k\frac{t}{T}\right)\,dt \\[1em]
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\sin\left(2\pi k\frac{t}{T}\right)\,dt &= a_0\underbrace{\int_{-\frac{T}{2}}^{\frac{T}{2}}\sin\left(2\pi k\frac{t}{T}\right)\,dt}_{\Large{=\,0 \text{ result of (6)}}} + \underbrace{\sum_{n\,=\,1}^{N}a_n\int_{-\frac{T}{2}}^{\frac{T}{2}}\cos\left(2\pi n\frac{t}{T}\right)\sin\left(2\pi k\frac{t}{T}\right)\,dt}_{\Large{=\,0 \text{ result of (8)}}} \\[1em] &+ \sum_{n\,=\,1}^{N}b_n\underbrace{\int_{-\frac{T}{2}}^{\frac{T}{2}}\sin\left(2\pi n\frac{t}{T}\right)\sin\left(2\pi k\frac{t}{T}\right)\,dt}_{\Large{=\,b_k\cdot\frac{T}{2} \text{ result of (9)}}} \\[1em]
\int_{-\frac{T}{2}}^{\frac{T}{2}}f(t)\sin\left(2\pi k\frac{t}{T}\right)\,dt &=b_k\cdot\frac{T}{2}\Longleftrightarrow\boxed{\,b_k =\frac{2}{T}\int_{T}^{} f(t)\sin\left(2\pi k\frac{t}{T}\right)\,dt\,=\frac{\big\langle f(t), \sin\left(2\pi k\frac{t}{T}\right) \big\rangle}{{\big\lVert \sin\left(2\pi k\frac{t}{T}\right) \big\rVert}^2}}

\end{align}$$

</div>

Now, we have obtained the \\(b\_n\\) coefficient which is the same as \\((4)\\). All of these steps allow us to understand where do Fourier series come from. As an excercise, you can try to derive the exponential expression. You just need to follow the same steps but using \\(\left\\{{e}^{i2\pi n\frac{t}{T}}\right\\}, n \in \mathbb{Z},\\) as the orthogonal basis and the same interval. Now, I'm going to share some details about the code and the app.

## The app

Here I will show you some videos of how the app works and how to use it. You have in total 3 videos that cover how each main button works and then how you can edit the settings for the animations.

<p class="text-center"> <b>DRAW SVG</b> - Step by step</p>
![0-control](images/projects/fourier/svg_draw.mp4)

<p class="text-center"> <b>IMPORT SVG</b> - Step by step</p>
![0-control](images/projects/fourier/svg_import.mp4)

<p class="text-center"> <b>IMPORT CSV</b> - Step by step</p>
![0-control](images/projects/fourier/csv_import.mp4)

All the GIFs are saved inside the folder called *gif*. After you close the app, there will still be there for you.

If you want to try the app, check the following github repo: <a target="_" href="https://github.com/agustin-j/fourier-app" class="link-general">fourier-app</a>

The app was built using Python version *3.12.2* and tested in Python version *3.12.2* and *3.11.9*.

## Gallery

Some cool results made by the app based on pre-existing SVGs.

<div class="row">
    <div class="col-lg-6">
        <img src="images/projects/fourier/music-note.gif">
        <p class="text-center"> Music Note</p> 
    </div>
    <div class="col-lg-6">
        <img src="images/projects/fourier/sigma.gif">
        <p class="text-center"> Sigma </p> 
    </div>
</div>

<div class="row">
    <div class="col-lg-6">
        <img src="images/projects/fourier/joseph-fourier.gif">
        <p class="text-center"> Joseph Fourier</p> 
    </div>
    <div class="col-lg-6">
        <img src="images/projects/fourier/planet.gif">
        <p class="text-center"> Little planet </p> 
    </div>
</div>

<br>

If you find any bug while trying the app, please let me know by sending an email here: <a href="mailto:agus.extrabusiness@gmail.com" class="link-general">agus.extrabusiness@gmail.com</a>