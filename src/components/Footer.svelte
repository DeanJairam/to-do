<footer>
    <hr />
    <div>
        <section>
            <p>Copyright © 2022 TO-DO</p>
        </section>
        <section>
            <strong>Follow creator :</strong>
            <a href="https://www.instagram.com/deanjairam/">
                <img src="icons/instagram.svg" alt="instagram" />
            </a>
            <a href="https://twitter.com/deanjairam">
                <img src="icons/twitter.svg" alt="" />
            </a>
        </section>
    </div>
</footer>

<style>
    footer {
        margin: 5rem 0;;
    }
    div {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    section {
        display: flex;
        align-items: center;
    }
    img {
        margin: 0 10px;
    }
    hr {
        width: 80vw;
        border: 1px solid rgba(0, 66, 33, 0.5);
    }
    p {
        text-align: center;
    }
    @media only screen and (max-width: 425px) {
        div {
            justify-content: center;
            flex-direction: column;
        }
    }
</style>
