<footer>
    <hr />
    <div>
        <section>
            <p>Copyright © 2022 TO-DO</p>
        </section>
        <section>
            <strong>Follow creator :</strong>
            <a href="https://www.instagram.com/deanjairam/">
                <img src="icons/instagram.svg" alt="instagram icon" />
            </a>
            <a href="https://twitter.com/deanjairam">
                <img src="icons/twitter.svg" alt="twitter icon" />
            </a>
        </section>
    </div>
</footer>

<style>
    footer {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        margin-bottom: 1rem;
        background-color: #f1fff8;
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
        border-color: rgba(0, 66, 33, 0.2);
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
